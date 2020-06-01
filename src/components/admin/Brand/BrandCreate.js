import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MemberTemplate from '../../membership/MemberTemplate';
import BrandForm from './BrandForm';
import Toolbar from '../../membership/Toolbar';
import { createBrand, fetchCountries } from '../../../actions/database';


class BrandCreate extends React.Component {

    componentDidMount() {
        this.props.fetchCountries();
    }

    onSubmit = formValues => {
        this.props.createBrand(formValues);
    }

    getCountryOption = () => {
        const { countries } = this.props;
        var options = [];
        if (countries) {
            Object.keys(countries).forEach(id => {
                var country = countries[id];
                options.push({
                    key: id,
                    flag: country.code,
                    text: country.name,
                    value: id
                });
            });
        }
        return options;
    }

    render() {

        return (
            <MemberTemplate
                className="hmy-brand-create"
                pageCode="database"
                pageTitle="add brand">

                <Toolbar >
                    <Link to="/brands" className="ui labeled icon blue button">
                        <i className="list icon" />List
                    </Link>
                </Toolbar>
                
                <BrandForm 
                    onSubmit={this.onSubmit} 
                    countries={this.getCountryOption()} />

            </MemberTemplate>
        );
    }
}

const mapStateToProps = state => {
    return {
        countries: state.database.countries
    }
}

export default connect(mapStateToProps, { createBrand, fetchCountries })(BrandCreate);