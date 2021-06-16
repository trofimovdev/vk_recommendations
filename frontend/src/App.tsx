import React from "react";
import MainColumn from "./components/MainColumn/MainColumn";
import RightColumn from "./components/RightColumn/RightColumn";
import RecommendationsBlock from "./components/RecommendationsBlock/RecommendationsBlock";
import FilterBlock from "./components/FilterBlock/FilterBlock";
import "./style/App.css";
import { withRouter } from "react-router";

const App = (): JSX.Element => {
    return (
        <div className="App">
            <MainColumn>
                <RecommendationsBlock title="Друзья рекомендуют" />
            </MainColumn>
            <RightColumn>
                <FilterBlock />
            </RightColumn>
        </div>
    );
};

export default withRouter(App);
