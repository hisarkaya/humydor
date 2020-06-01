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
import CountryDisplay from './admin/Country/CountryDisplay';
import CountryDelete from './admin/Country/CountryDelete';

import BrandList from './admin/Brand/BrandList';
import BrandCreate from './admin/Brand/BrandCreate';
import BrandEdit from './admin/Brand/BrandEdit';
import BrandDisplay from './admin/Brand/BrandDisplay';
import BrandDelete from './admin/Brand/BrandDelete';

import NameList from './admin/Name/NameList';
import NameCreate from './admin/Name/NameCreate';
import NameEdit from './admin/Name/NameEdit';
import NameDisplay from './admin/Name/NameDisplay';
import NameDelete from './admin/Name/NameDelete';

import SignIn from './common/SignIn';
import SignUp from './common/SignUp';
import SignUpForm from './common/SignUpForm';
import TermsConditions from './common/TermsConditions';

import CigarList from './membership/cigars/CigarList';
import CigarCreate from './membership/cigars/CigarCreate';
import CigarEdit from './membership/cigars/CigarEdit';
import CigarDelete from './membership/cigars/CigarDelete';
import CigarDisplay from './membership/cigars/CigarDisplay';

const App = (props) => {
    if(props.isWindowLoading) {
        return <Loader />;
    }
    return (
        <Router history={history}>
            
            <AuthRoute exact path="/" roles={[Role.Admin, Role.Member]} component={Dashboard} />
            <AuthRoute exact path="/cigars" roles={[Role.Admin, Role.Member]} component={CigarList} />
            <AuthRoute exact path="/cigars/new" roles={[Role.Admin, Role.Member]} component={CigarCreate} />
            <AuthRoute exact path="/cigars/edit/:id" roles={[Role.Admin, Role.Member]} component={CigarEdit} />
            <AuthRoute exact path="/cigars/delete/:id" roles={[Role.Admin, Role.Member]} component={CigarDelete} />
            <AuthRoute exact path="/cigars/display/:id" roles={[Role.Admin, Role.Member]} component={CigarDisplay} />

            <AuthRoute exact path="/countries" roles={[Role.Admin]} component={CountryList} />
            <AuthRoute exact path="/countries/new" roles={[Role.Admin]} component={CountryCreate} />
            <AuthRoute exact path="/countries/edit/:id" roles={[Role.Admin]} component={CountryEdit} />
            <AuthRoute exact path="/countries/delete/:id" roles={[Role.Admin]} component={CountryDelete} />
            <AuthRoute exact path="/countries/display/:id" roles={[Role.Admin]} component={CountryDisplay} />

            <AuthRoute exact path="/brands" roles={[Role.Admin]} component={BrandList} />
            <AuthRoute exact path="/brands/new" roles={[Role.Admin]} component={BrandCreate} />
            <AuthRoute exact path="/brands/edit/:id" roles={[Role.Admin]} component={BrandEdit} />
            <AuthRoute exact path="/brands/delete/:id" roles={[Role.Admin]} component={BrandDelete} />
            <AuthRoute exact path="/brands/display/:id" roles={[Role.Admin]} component={BrandDisplay} />

            <AuthRoute exact path="/names" roles={[Role.Admin]} component={NameList} />
            <AuthRoute exact path="/names/new" roles={[Role.Admin]} component={NameCreate} />
            <AuthRoute exact path="/names/edit/:id" roles={[Role.Admin]} component={NameEdit} />
            <AuthRoute exact path="/names/delete/:id" roles={[Role.Admin]} component={NameDelete} />
            <AuthRoute exact path="/names/display/:id" roles={[Role.Admin]} component={NameDisplay} />
           
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