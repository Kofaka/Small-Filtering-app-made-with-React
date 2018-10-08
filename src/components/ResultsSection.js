import React from 'react';

import './ResultsSection.scss';

const ResultsSection = ({items = []}) => {
    const ResultItem = ({item}) => (
        <li className="results-section__item">
            <span className="results-section__item__title">{item.title}</span>
            <span className="results-section__item__description">{item.tags.join(', ')}</span>
        </li>
    );
    return (
        <ul className="results-section">
            {items.map(item => <ResultItem item={item} key={item.id}/>)}
        </ul>
    );
};

export default ResultsSection;
