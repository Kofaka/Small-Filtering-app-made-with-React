import React from 'react';
import {shallow} from 'enzyme';
import expect, {spyOn} from 'expect';

import FilteringSidebar from './FilteringSidebar';
import FilteringSidebarItem from './FilteringSidebarItem';

const setup = (propsOverrides) => {
    const props = Object.assign({
        data: [
            {
                "title": "Instabug",
                "id": "instabug",
                "tags": [
                    "analytics"
                ]
            },
            {
                "title": "Intercom",
                "id": "intercom",
                "tags": [
                    "marketing-automation"
                ]
            },
            {
                "title": "Ionic Keyboard",
                "id": "ionic-keyboard",
                "tags": [
                    "development-tool"
                ]
            },
        ],
        filterHandler: () => {},
    }, propsOverrides);

    const wrapper = shallow(<FilteringSidebar {...props} />);

    return {
        props,
        wrapper,
        instance: wrapper.instance(),
    };
};


describe('Component: FilteringSidebar', () => {
    it('renders without crashing', () => {
        const {wrapper} = setup();
        expect(wrapper.exists()).toBe(true);
    });

    it('shows 5 "FilteringSidebarItem"s (for "search", "all" and for 3 tags)', () => {
        const {wrapper} = setup();
        expect(wrapper.find(FilteringSidebarItem).length).toBe(5);
    });

    it('shows a new search results when the user types', () => {
        const filterHandlerMock = jest.fn();
        const {wrapper, instance} = setup({filterHandler: filterHandlerMock});
        const searchInputHandlerMock = jest.spyOn(instance, 'searchInputHandler');

        const firstUserInputValue = 'ti';
        const nextUserInputValue = 'tic';


        searchInputHandlerMock({target: {value: firstUserInputValue}});

        expect(wrapper.state('query')).toEqual(firstUserInputValue);
        expect(filterHandlerMock).toHaveBeenCalledWith(firstUserInputValue);


        searchInputHandlerMock({target: {value: nextUserInputValue}});

        expect(wrapper.state('query')).toEqual(nextUserInputValue);
        expect(filterHandlerMock).toHaveBeenCalledWith(nextUserInputValue);
    });

    it('shows all results when the user clears search input', () => {
        const filterHandlerMock = jest.fn();
        const {wrapper, instance} = setup({filterHandler: filterHandlerMock});
        const searchInputHandlerMock = jest.spyOn(instance, 'searchInputHandler');

        const inputValueTypedByUser = '';

        searchInputHandlerMock({target: {value: inputValueTypedByUser}});

        expect(wrapper.state('query')).toEqual(inputValueTypedByUser);
        expect(filterHandlerMock).toHaveBeenCalledWith('all');

    });
});
