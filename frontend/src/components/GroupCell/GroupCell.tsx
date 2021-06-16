import React from "react";
import Button from "../Button/Button";
import { declOfNum } from "../../tools/helpers";
import "./GroupCell.css";

export interface GroupCellProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    verified: boolean;
    screen_name: string;
    activity: string;
    img: string;
    friends: string[];
    following?: boolean;
}

const GroupCell = ({
    title,
    verified,
    screen_name,
    activity,
    img,
    friends,
    following = false,
}: GroupCellProps): JSX.Element => {
    return (
        <div className="GroupCell">
            <div className="GroupCell__img">
                <a href={`https://vk.com/${screen_name}`}>
                    <img src={img} alt={title} />
                </a>
            </div>
            <div className="GroupCell__info">
                <div className="GroupCell__info__title">
                    <a
                        className="GroupCell__info__title__text"
                        href={`https://vk.com/${screen_name}`}
                    >
                        {title}
                    </a>
                    {verified && (
                        <a
                            className="GroupCell__info__title_verified"
                            href="https://vk.com/verify"
                        >
                            {" "}
                        </a>
                    )}
                </div>
                <div className="GroupCell__info__activity">{activity}</div>
                <div className="GroupCell__info__users">
                    <div className="GroupCell__info__users__photos">
                        {friends
                            .slice(0, 3)
                            .map((item: string, index: number) => {
                                return (
                                    <a
                                        key={index}
                                        title={item}
                                        style={{
                                            backgroundImage:
                                                "url(https://vk.com/images/camera_50.png)",
                                        }}
                                        href="https://vk.com"
                                    >
                                        {" "}
                                    </a>
                                );
                            })}
                    </div>
                    <div className="GroupCell__info__users__text">
                        {friends.length === 1 ? (
                            <>Рекомендует </>
                        ) : (
                            <>Рекомендуют </>
                        )}

                        {friends.length < 3
                            ? friends.join(" и ")
                            : `${friends.length} 
                                ${declOfNum(friends.length, [
                                    "друг",
                                    "друга",
                                    "друзей",
                                ])}
                                `}
                    </div>
                </div>
            </div>
            {following ? (
                <div className="GroupCell__controls">
                    <Button theme="light">Вы подписаны</Button>
                </div>
            ) : (
                <div className="GroupCell__controls">
                    <Button theme="blue">Подписаться</Button>
                </div>
            )}
        </div>
    );
};
export default GroupCell;
