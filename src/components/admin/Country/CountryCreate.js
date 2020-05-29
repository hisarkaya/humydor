import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MemberTemplate from '../../membership/MemberTemplate';
import CountryForm from './CountryForm';
import Toolbar from '../../membership/Toolbar';
import { createCountry } from '../../../actions/database';

class CountryCreate extends React.Component {

    onSubmit = formValues => {
        this.props.createCountry(formValues);
    }

    render() {
        return (
            <MemberTemplate
                className="hmy-country-create"
                pageCode="database"
                pageTitle="add country">

                <Toolbar >
                    <Link to="/countries" className="ui labeled icon blue button">
                        <i className="list icon" />List
                    </Link>
                </Toolbar>
                
                <CountryForm onSubmit={this.onSubmit} />

            </MemberTemplate>
        );
    }
}

export default connect(null, { createCountry })(CountryCreate);