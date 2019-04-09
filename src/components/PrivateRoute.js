import firebase from '../plugins/firebase'
import React from 'react';
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        firebase.auth().currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            {...props}
            to={{
              pathname: "/login/",
              search: `?redirect=${props.location.pathname}`,
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute
