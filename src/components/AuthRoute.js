import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Loader from './Loader';

const AuthRoute = ({ component: Component, isWindowLoading, location, isAuthenticated, user, roles, ...rest }) => (

    <Route {...rest} render={props => {
        if(isWindowLoading) {
            return <Loader />
        }
        if (!isAuthenticated) {
            return <Redirect to={{ pathname: '/signin', state: { from: location } }} />
        }
        if (roles && roles.indexOf(user.role) === -1) {
            return <Redirect to={{ pathname: '/' }} />
        }
        return <Component {...props} />
    }} />
);

const mapStateToProps = (state) => {
    return {
        isWindowLoading: state.auth.isWindowLoading,
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(AuthRoute);