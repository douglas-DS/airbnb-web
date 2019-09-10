import React from 'react';

import Routes from './routes';

import { GlobalStyle } from './styles/global';

const App = ({ history, context }) => (
    <>
        <Routes history={history} context={context} />
        <GlobalStyle />
    </>
);

export default App;