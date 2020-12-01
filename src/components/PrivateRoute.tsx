import React from 'react'
import {Redirect, Route, RouteProps} from "react-router";

interface PrivateRouteProps extends RouteProps{
    component: any,
    auth(): boolean
}


const PrivateRoute = (props: PrivateRouteProps) => {
    const{component: Component, auth, ...rest} = props;

    return(
        <Route
            {...rest}
            render={props => (
                auth() === true
            )
                ? <Component {...props} />
                : (<Redirect to='/'/>)
            }
        />
    )
};

export default PrivateRoute