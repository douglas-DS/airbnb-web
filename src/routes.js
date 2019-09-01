import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { isAuthenticated } from './services/auth';

const PrivateRoute = ({ component: Component, ...rest  }) => (
    <Route
        {...rest}
        render = {props => 
            isAuthenticated() ? (
                <Component {...props} />
            )
        }
    />
);