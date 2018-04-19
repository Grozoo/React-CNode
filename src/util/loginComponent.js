import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const LoginComponent = ({ component: Component, ...data }) => (
  <Route
    {...data}
    render={props =>
      localStorage.token ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default LoginComponent;
