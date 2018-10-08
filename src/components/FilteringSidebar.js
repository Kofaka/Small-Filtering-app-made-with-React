import React, {Component} from 'react';

import FilteringSidebarItem from './FilteringSidebarItem';
import './FilteringSidebar.scss';

class FilteringSidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
        };

        this.searchInputHandler = this.searchInputHandler.bind(this);
    }

    searchInputHandler(e) {
        const {value} = e.target;
        const {filterHandler} = this.props;

        this.setState({
            query: value
        }, () => (value && value.length) ? filterHandler(value) : filterHandler('all'));
    }

    render() {
        const {data, filterHandler} = this.props;

        const uniqueTags = (() => {
            let allTags = [];

            data.map(item => item.tags.map(tag => allTags.push(tag)));

            return [...new Set(allTags)].sort((a, b) => (a < b) ? -1 : (a > b) ? 1 : 0);
        })();

        const searchLabel = (
            <input
                className="filtering-sidebar__search-input"
                type="search"
                id="tags-search"
                name="filter"
                placeholder="Search"
                aria-label="Search Tag"
                onChange={this.searchInputHandler}
            />
        );

        return (
            <form>
                <fieldset className="filtering-sidebar">
                    <FilteringSidebarItem
                        tag="search"
                        label={searchLabel}
                        clickHandler={() => filterHandler('all')}
                    />

                    <FilteringSidebarItem
                        tag="all"
                        label="All"
                        clickHandler={() => filterHandler('all')}
                        defaultChecked="true"
                    />

                    {uniqueTags.map(tag =>
                        <FilteringSidebarItem
                            key={tag}
                            tag={tag}
                            label={tag}
                            clickHandler={() => filterHandler(tag)}
                        />
                    )}
                </fieldset>
            </form>
        );
    }
}

export default FilteringSidebar;
