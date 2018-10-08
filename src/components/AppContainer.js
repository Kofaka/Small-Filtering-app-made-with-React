import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getSDKsData} from '../actions/api';
import ResultsSection from './ResultsSection';
import FilteringSidebar from './FilteringSidebar';

import './AppContainer.scss';

export class AppContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
        };

        this.filterHandler = this.filterHandler.bind(this);
    }

    componentDidMount() {
        this.props.getSDKsData();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            results: nextProps.sdksData,
        })
    }

    filterHandler(query) {
        const {sdksData} = this.props;

        let results = (query === 'all')
            ? sdksData
            : sdksData.filter(item => item.tags.some(tag => tag.includes(query.toLowerCase())));

        this.setState({results});
    }

    render() {
        return [
            <header className="app-container__header" key='header'>
                <h1 className="app-container__header__title">SDKs</h1>
            </header>,

            <main className="app-container__main" key='main'>
                <section className="app-container__main__section">
                    <FilteringSidebar
                        data={this.props.sdksData}
                        filterHandler={this.filterHandler}
                    />
                </section>

                <section className="app-container__main__section">
                    <ResultsSection items={this.state.results} />
                </section>
            </main>
        ];
    }
}

export default connect(
    state => ({
        sdksData: state.sdks.sdksData,
    }),
    dispatch => ({
        getSDKsData: () => dispatch(getSDKsData())
    })
)(AppContainer);
