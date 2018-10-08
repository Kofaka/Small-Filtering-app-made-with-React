import React from 'react';
import expect from 'expect';
import renderer from 'react-test-renderer';

import ResultsSection from './ResultsSection';

const setup = (propsOverrides) => {
    const props = Object.assign({
        items: [
            {
                title: 'SDK 1',
                id: 'sdk1',
                tags: ['tag-name-1', 'tag-name-2'],
            },
            {
                title: 'SDK 2',
                id: 'sdk2',
                tags: ['tag-name-3', 'tag-name-5'],
            },
            {
                title: 'SDK 3',
                id: 'sdk3',
                tags: ['tag-name-2', 'tag-name-3', 'tag-name-4'],
            }
        ],
    }, propsOverrides);

    return {
        props
    };
};


describe('Component: ResultsSection', () => {
    it('renders without crashing', () => {
        const {props} = setup();
        const resultsSection = renderer
            .create(<ResultsSection {...props} />)
            .toJSON();
        expect(resultsSection).toMatchSnapshot();
    });
});

