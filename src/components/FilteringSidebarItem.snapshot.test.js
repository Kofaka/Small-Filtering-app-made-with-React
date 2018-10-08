import React from 'react';
import expect from 'expect';
import renderer from 'react-test-renderer';

import FilteringSidebarItem from './FilteringSidebarItem';

const setup = (propsOverrides) => {
    const props = Object.assign({
        tag: 'tag-name-1',
        label: 'SDK 1',
        defaultChecked: false,
        clickHandler: () => {},
    }, propsOverrides);

    return {
        props
    };
};


describe('Component: FilteringSidebarItem', () => {
    it('renders without crashing', () => {
        const {props} = setup();
        const filteringSidebarItem = renderer
            .create(<FilteringSidebarItem {...props} />)
            .toJSON();
        expect(filteringSidebarItem).toMatchSnapshot();
    });
});

