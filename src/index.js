import React from 'react';
import ReactDOM from 'react-dom';
// Insert this import line in your code:
import './include/bootstrap'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
