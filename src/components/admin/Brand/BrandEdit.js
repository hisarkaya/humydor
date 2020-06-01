import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MemberTemplate from '../../membership/MemberTemplate';
import BrandForm from './BrandForm';

import Toolbar from '../../membership/Toolbar';
import { fetchBrand, editBrand, fetchCountries } from '../../../actions/database';

class BrandEdit extends React.Component {

    componentDidMount = () => {
        this.props.fetchCountries();
        this.props.fetchBrand(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.editBrand(this.props.match.params.id, formValues);
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
        if (!this.props.brand) {
            return null;
        }

        return (
            <MemberTemplate
                className="hmy-brand-create"
                pageCode="database"
                pageTitle="edit brand">

                <Toolbar >
                    <Link to="/brands" className="ui labeled icon blue button">
                        <i className="list icon" />List
                    </Link>
                </Toolbar>
    
                <BrandForm
                 initialValues={{name:this.props.brand.name, countryId: this.props.brand.country.id}}
                 onSubmit={this.onSubmit} 
                 countries={this.getCountryOption()}
                 />

            </MemberTemplate>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        brand: state.database.brands[ownProps.match.params.id],
        countries: state.database.countries
    }
}

export default connect(mapStateToProps, { fetchBrand , editBrand, fetchCountries })(BrandEdit);