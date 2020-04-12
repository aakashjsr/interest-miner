import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
    //   auth.isAuthenticated === true ? (
      false === true ? (

          <div>
              
        <Component {...props} />
        </div>
      ) : (
        <Redirect from="/" to="/auth/login" /> 
      )
    }
  />
);


export default PrivateRoute;