import React from 'react';
import {render} from 'react-dom';

import AppContainer from './components/AppContainer.js';
import store from './store';

render(<AppContainer store={store} />, document.getElementById('root'));
