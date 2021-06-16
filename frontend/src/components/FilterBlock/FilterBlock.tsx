import React from "react";
import Block from "../Block/Block";
import "./FilterBlock.css";
import DropDown from "../DropDown/DropDown";
import { connect } from "react-redux";
import { setSortType } from "../../store/groups/actions";

export interface FilterBlockProps extends React.HTMLAttributes<HTMLDivElement> {
    setSortType?: any;
}

const FilterBlock = ({ setSortType }: FilterBlockProps): JSX.Element => {
    return (
        <Block className="FilterBlock">
            <div className="FilterBlock__filter">
                <div className="FilterBlock__filter__title">Сортировка</div>
                <DropDown
                    ddId="sort"
                    options={["По дате создания", "По количеству рекомендаций"]}
                    onSelectOption={(ddId: string, value: number) => {
                        setSortType(value);
                    }}
                />
            </div>
        </Block>
    );
};

const mapDispatchToProps = {
    setSortType,
};

export default connect(null, mapDispatchToProps)(FilterBlock);
