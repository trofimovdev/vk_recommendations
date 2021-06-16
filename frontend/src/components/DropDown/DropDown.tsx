import React, { useEffect, useState } from "react";
import "./DropDown.css";
import { connect } from "react-redux";
import { setOpenedId } from "../../store/dropdowns/actions";
import { useHistory, useLocation } from "react-router-dom";

export interface DropDownProps extends React.HTMLAttributes<HTMLDivElement> {
    ddId: string;
    options: string[];
    onSelectOption?: (ddId: string, value: number) => void;
    defaultOption?: number;
    openedId?: string;
    setOpenedId?: any;
}

const DropDown = ({
    ddId,
    options,
    onSelectOption,
    defaultOption = 0,
    openedId,
    setOpenedId,
}: DropDownProps): JSX.Element => {
    let history = useHistory();
    let location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const [selection, setSelection] = useState(defaultOption);

    useEffect(() => {
        const paramsDdId = new URLSearchParams(location.search).get(ddId);
        let data = null;
        if (paramsDdId !== null && parseInt(paramsDdId) < options.length) {
            data = parseInt(paramsDdId);
        } else {
            data = defaultOption;
        }

        setSelection(data);
        if (onSelectOption) {
            onSelectOption(ddId, data);
        }
    }, [location.search, ddId, options.length, defaultOption, onSelectOption]);

    const toggle = () => {
        if (openedId === ddId) {
            setOpenedId("");
        } else {
            setOpenedId(ddId);
        }
    };

    return (
        <div className="DropDown">
            <div
                className="DropDown__header"
                onClick={() => {
                    toggle();
                }}
                onKeyPress={() => {
                    toggle();
                }}
                tabIndex={0}
                role="button"
            >
                <div>{options[selection]}</div>
                <div className="DropDown__header__arrow" />
            </div>
            {openedId === ddId && (
                <ul className="DropDown__options">
                    {options.map((item: string, index: number) => {
                        return (
                            <li
                                key={index}
                                className="DropDown__options__block"
                                onClick={() => {
                                    toggle();
                                    searchParams.set(ddId, index.toString());
                                    history.push({
                                        search: "?" + searchParams.toString(),
                                    });
                                    if (onSelectOption) {
                                        onSelectOption(ddId, index);
                                    }
                                }}
                            >
                                {item}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

const mapStateToProps = (state: { dropdows: { openedId: any } }) => {
    return {
        openedId: state.dropdows.openedId,
    };
};

const mapDispatchToProps = {
    setOpenedId,
};

export default connect(mapStateToProps, mapDispatchToProps)(DropDown);
