import ConnectionError from "./ConnectionError";

type paramsType = {
    [key: string]: string,
};
type requestParamsType = {
    [key: string]: string | {} | undefined,
};

export default class Backend {
    static __call = (
        method: string,
        params: paramsType = {},
        httpMethod: string = "GET",
    ): Promise<Response> => {
        let url = `${process.env.REACT_APP_API_HOST}${method}`;

        const requestParams: requestParamsType = {
            method: httpMethod || "GET",
            cache: "no-cache",
            redirect: "error",
            headers: {
                "Content-Type": "application/json",
            },
            body: undefined,
        };

        if (httpMethod.toString().toUpperCase() !== "GET") {
            requestParams.body =
                params instanceof FormData ? params : JSON.stringify(params);
        } else {
            const paramsString = new URLSearchParams(params).toString();
            url += `?${paramsString}`;
        }

        return new Promise((resolve, reject) => {
            try {
                fetch(url, requestParams)
                    .then(resolve)
                    .catch((e) => {
                        e.network = true;
                        e.message = `${e.message} ${url}`;
                        reject(e);
                    });
            } catch (e) {
                reject(e);
            }
        });
    };

    static request = (
        method: string,
        params: paramsType,
        httpMethod: string = "GET",
        retry: number = 5,
    ): Promise<Response> => {
        return new Promise((resolve, reject) => {
            try {
                Backend.__call(method, params, httpMethod)
                    .then((r) => {
                        const contentType = r.headers.get("Content-Type");
                        if (
                            contentType &&
                            contentType.indexOf("application/json") !== -1
                        ) {
                            r.json().then(
                                (data: {
                                    response: any,
                                    error_msg: string,
                                }) => {
                                    if (data.response !== undefined) {
                                        resolve(data.response);
                                    } else {
                                        reject(data.error_msg);
                                    }
                                },
                            );
                        } else if (retry > 0) {
                            setTimeout(() => {
                                Backend.request(
                                    method,
                                    params,
                                    httpMethod,
                                    retry - 1,
                                )
                                    .then(resolve)
                                    .catch(reject);
                            }, Math.random() * 1000);
                        } else {
                            throw new ConnectionError(
                                `${httpMethod} ${method} response ${r.status} Content-Type: ${contentType}`,
                            );
                        }
                    })
                    .catch((e) => {
                        if (e && e.network && retry > 0) {
                            setTimeout(() => {
                                Backend.request(
                                    method,
                                    params,
                                    httpMethod,
                                    retry - 1,
                                )
                                    .then(resolve)
                                    .catch(reject);
                            }, Math.random() * 1000);
                        } else {
                            reject(e);
                        }
                    });
            } catch (e) {
                if (retry > 0) {
                    setTimeout(() => {
                        Backend.request(method, params, httpMethod, retry - 1)
                            .then(resolve)
                            .catch(reject);
                    }, Math.random() * 1000);
                } else {
                    reject(e);
                }
            }
        });
    };
}
