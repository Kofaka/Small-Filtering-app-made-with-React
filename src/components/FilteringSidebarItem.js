import React from 'react';

const FilteringSidebarItem = ({tag, label, clickHandler, defaultChecked}) => (
    <div className="filtering-sidebar__item">
        <input
            className="filtering-sidebar__item__icon"
            type="radio"
            id={tag}
            name="filter"
            value={tag}
            onClick={() => clickHandler()}
            defaultChecked={defaultChecked}
        />

        <label
            className="filtering-sidebar__item__name"
            htmlFor={tag}
        >
            {label}
        </label>
    </div>
);

export default FilteringSidebarItem;

