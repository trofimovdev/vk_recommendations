import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import { getGroups } from "./tools/helpers";
import { setList } from "./store/groups/actions";

const groups = [
    147415323, 23956131, 154430577, 154085965, 123863156, 150388128, 152330153,
    178386303, 78333766, 54530371, 86529522, 167090967, 187376020, 173151748,
    91635769,
];

getGroups(groups)
    .then((data) => {
        store.dispatch(setList(data));
    })
    .catch((e) => console.log(e));
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
