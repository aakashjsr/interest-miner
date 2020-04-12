import React from 'react';
import { Route, Redirect } from 'react-router-dom';


export const PublicRoute = ({
    isAuthanicated,
    component: Component,
    ...rest
}) => (
        <Route {...rest} component={(props) => (
            isAuthanicated ? (
                <Redirect to="/dashbord" />
            ) : (
                    <Component {...props} />
                )
        )} />
    );



export default PublicRoute;