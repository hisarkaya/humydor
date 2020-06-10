import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MemberTemplate from '../../membership/MemberTemplate';
import CountryForm from './CountryForm';
import Toolbar from '../../membership/Toolbar';
import { fetchCountries, createCountry } from '../../../actions/database';

class CountryCreate extends React.Component {

    componentDidMount() {
        this.props.fetchCountries();
    }

    onSubmit = formValues => {
        this.props.createCountry(formValues);
    }

    render() {
        return (
            <MemberTemplate
                className="hmy-country-create"
                pageCode="database">

                <Toolbar header="add country" >
                    <Link to="/countries" className="item">
                        <i className="list icon" />
                    </Link>
                </Toolbar>
                
                <CountryForm
                    countries={this.props.countries}
                    hideCancel={false}
                    form="countryFormCreate" 
                    onSubmit={this.onSubmit} />

            </MemberTemplate>
        );
    }
}


const mapStateToProps = state => {
    return {
        countries: state.database.countries
    }
}

export default connect(mapStateToProps, { createCountry, fetchCountries })(CountryCreate);