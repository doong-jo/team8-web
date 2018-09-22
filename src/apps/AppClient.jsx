import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const AppClient = () => (
    <BrowserRouter>
        <App initState={window.APP_INITIAL_STATE} />
    </BrowserRouter>
);

export default AppClient;
