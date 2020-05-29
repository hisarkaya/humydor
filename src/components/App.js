import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import history from '../history';
import Role from '../helpers/role';
import Loader from './Loader';
import AuthRoute from './AuthRoute';
import Dashboard from './membership/Dashboard';
import CountryList from './admin/Country/CountryList';
import CountryCreate from './admin/Country/CountryCreate';
import CountryEdit from './admin/Country/CountryEdit';
import CountryDelete from './admin/Country/CountryDelete';
import BrandList from './admin/Brand/BrandList';
import NameList from './admin/Name/NameList';
import SignIn from './common/SignIn';
import SignUp from './common/SignUp';
import SignUpForm from './common/SignUpForm';
import TermsConditions from './common/TermsConditions';
import Cigars from './membership/Cigars';

const App = (props) => {
    if(props.isWindowLoading) {
        return <Loader />;
    }
    return (
        <Router history={history}>
            
            <AuthRoute exact path="/" roles={[Role.Admin, Role.Member]} component={Dashboard} />
            <AuthRoute exact path="/cigars" roles={[Role.Admin, Role.Member]} component={Cigars} />
            <AuthRoute exact path="/countries" roles={[Role.Admin]} component={CountryList} />
            <AuthRoute exact path="/countries/new" roles={[Role.Admin]} component={CountryCreate} />
            <AuthRoute exact path="/countries/edit/:id" roles={[Role.Admin]} component={CountryEdit} />
            <AuthRoute exact path="/countries/delete/:id" roles={[Role.Admin]} component={CountryDelete} />
            <AuthRoute exact path="/brands" roles={[Role.Admin]} component={BrandList} />
            <AuthRoute exact path="/names" roles={[Role.Admin]} component={NameList} />
           
            <Route path="/terms-and-conditions" exact component={TermsConditions} />
            <Route path="/signup-form/" exact component={SignUpForm} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/signup" exact component={SignUp} />
        </Router>
    );
}

const mapStateToProps = state => {
    return {
        isWindowLoading: state.auth.isWindowLoading
    }
}

export default connect(mapStateToProps)(App);