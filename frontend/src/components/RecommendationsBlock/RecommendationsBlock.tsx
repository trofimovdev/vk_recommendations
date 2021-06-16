import React from "react";
import Block from "../Block/Block";
import "./RecommendationsBlock.css";
import GroupCell from "../GroupCell/GroupCell";
import { connect } from "react-redux";
import { getFollowingStatus, getNames } from "../../tools/helpers";

export interface RecommendationsBlockProps
    extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    list?: Group[];
    sortType?: number;
}

interface Group {
    id: number;
    name: string;
    screen_name: string;
    members_count: number;
    photo_100: string;
    verified: number;
    activity: string;
}

const RecommendationsBlock = ({
    title,
    list,
    sortType,
}: RecommendationsBlockProps): JSX.Element => {
    const sortBy = (list: Group[], sortType: number): Group[] => {
        let result: Group[] = [];
        Object.keys(list).forEach((key: any) => {
            const item: Group = list[key];
            result = [...result, item];
        });
        switch (sortType) {
            case 0:
            default:
                return result;
            case 1:
                result.sort((a, b) => {
                    if (getNames(a.id).length < getNames(b.id).length) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
                return result;
        }
    };

    return (
        <Block className="RecommendationsBlock">
            <div className="RecommendationsBlock__header">{title}</div>
            <div className="RecommendationsBlock__list">
                {list &&
                    sortBy(list, sortType || 0).map((item: Group) => {
                        return (
                            <GroupCell
                                key={item.id}
                                title={item.name}
                                verified={item.verified === 1}
                                screen_name={item.screen_name}
                                activity={item.activity}
                                img={item.photo_100}
                                friends={getNames(item.id)}
                                following={getFollowingStatus(item.id)}
                            />
                        );
                    })}
            </div>
        </Block>
    );
};

const mapStateToProps = (state: {
    groups: {
        list: Group[],
        sortType: number,
    },
}) => {
    return {
        list: state.groups.list,
        sortType: state.groups.sortType,
    };
};

export default connect(mapStateToProps, null)(RecommendationsBlock);
