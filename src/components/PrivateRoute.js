import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getUser } from "../helpers/user";

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const currentUser = getUser(); 
      if (!currentUser) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }
      return <Component {...props} />;
    }}
  />
);

export default PrivateRoute;
