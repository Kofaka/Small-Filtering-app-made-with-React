import React from 'react';
import {shallow, mount} from 'enzyme';
import expect from 'expect';

import {AppContainer} from './AppContainer';

const setup = (propsOverrides) => {
    const props = Object.assign({
        sdksData: [
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
                    "marketing-automation",
                    "analytics"
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
        getSDKsData: () => {},
    }, propsOverrides);

    return {
        props
    };
};

const newSdksDataMock = [
    {
        "title": "Segment",
        "id": "segment",
        "tags": [
            "analytics"
        ]
    },
    {
        "title": "Smaato",
        "id": "smaato",
        "tags": [
            "ad-network"
        ]
    },
];

describe('Component: FilteringSidebar', () => {
    it('renders without crashing', () => {
        const {props} = setup();
        const wrapper = shallow(<AppContainer {...props} />);
        expect(wrapper.exists()).toBe(true);
    });

    it('get SDKs data when componentDidMount method calls', () => {
        jest.spyOn(AppContainer.prototype, 'componentDidMount');
        const getSDKsDataMock = jest.fn();
        const {props} = setup({getSDKsData: getSDKsDataMock});
        mount(<AppContainer {...props} />);

        expect(AppContainer.prototype.componentDidMount.mock.calls.length).toBe(1);
        expect(getSDKsDataMock).toHaveBeenCalledTimes(1)
    });

    it('changes "results" in state when new props with sdksData came', () => {
        const {props} = setup();
        const wrapper = mount(<AppContainer {...props} />);
        jest.spyOn(AppContainer.prototype, 'componentWillReceiveProps');

        const resultsPrevState = wrapper.state('results');

        wrapper.setProps({results: newSdksDataMock});

        const resultsNextState = wrapper.state('results');

        expect(AppContainer.prototype.componentWillReceiveProps.mock.calls.length).toBe(1);
        expect(resultsPrevState[0] == resultsNextState[0]).toBe(false);
        expect(wrapper.props().sdksData[0].title == resultsNextState[0].title).toBe(true);
    });

    it('show only that items that matches query that came in', () => {
        const {props} = setup();
        const wrapper = shallow(<AppContainer {...props} />, { disableLifecycleMethods: true });
        const instance = wrapper.instance();
        const filterHandlerMock = jest.spyOn(instance, 'filterHandler');

        filterHandlerMock('');
        expect(
            props.sdksData.length == instance.state.results.length
            && props.sdksData[0].title == instance.state.results[0].title
        ).toBe(true);

        filterHandlerMock('all');
        expect(
            props.sdksData.length == instance.state.results.length
            && props.sdksData[0].title == instance.state.results[0].title
        ).toBe(true);

        filterHandlerMock('analytics');
        expect(instance.state.results.length).toBe(2);
        expect(instance.state.results.every(item => item.tags.some(tag => tag.includes('analytics')))).toBe(true);

        filterHandlerMock('no-such-tag');
        expect(instance.state.results.length).toBe(0);
    });
});
