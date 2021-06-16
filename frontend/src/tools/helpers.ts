import Backend from "./Backend";

export const isDevEnv = () => {
    return process.env.NODE_ENV === "development";
};

export const devLog = (any: any) => {
    if (isDevEnv()) {
        console.log(any);
    }
};

export const declOfNum = (n: number, titles: string[]) => {
    return titles[
        n % 10 === 1 && n % 100 !== 11
            ? 0
            : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
            ? 1
            : 2
    ];
};

export type className = number | string | false | null | undefined;

export const classNames = (...classNames: className[]): string => {
    let result: string[] = [];
    classNames.forEach((item: className): void => {
        if (!item) {
            return;
        }
        if (typeof item === "string") {
            result.push(item);
        } else {
            result.push(`${item}`);
        }
    });
    return result.join(" ");
};

export const getNames = (id: number): string[] => {
    switch (id % 10) {
        case 0:
        case 1:
            return ["Иван", "Владимир", "Ирина"];
        case 2:
        case 3:
            return ["Анатолий", "Сергей"];
        case 4:
        case 5:
            return ["Елизавета", "Евгений", "Александр", "Павел", "Андрей"];
        case 6:
        case 7:
            return ["Ксения", "Саша"];
        case 8:
        case 9:
        default:
            return ["Анатолий"];
    }
};

export const getFollowingStatus = (id: number): boolean => {
    switch (id % 10) {
        case 0:
        case 1:
        case 2:
            return false;
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        default:
            return true;
    }
};

export const getGroups = (ids: number[]) => {
    const params = {
        ids: ids.join(","),
    };
    return new Promise((resolve, reject) => {
        Backend.request("groups", params, "GET")
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
};
