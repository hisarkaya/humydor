import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MemberTemplate from '../../membership/MemberTemplate';
import CountryForm from './CountryForm';

import Toolbar from '../../membership/Toolbar';
import { fetchCountry, editCountry } from '../../../actions/database';

class CountryEdit extends React.Component {

    componentDidMount = () => {
        this.props.fetchCountry(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.editCountry(this.props.match.params.id, formValues);
    }

    render() {
        if (!this.props.country) {
            return null;
        }
        return (
            <MemberTemplate
                className="hmy-country-create"
                pageCode="database"
                pageTitle="edit country">

                <Toolbar >
                    <Link to="/countries" className="ui labeled icon blue button">
                        <i className="list icon" />List
                    </Link>
                </Toolbar>
    
                <CountryForm
                 initialValues={this.props.country}
                 onSubmit={this.onSubmit} 
                 />

            </MemberTemplate>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        country: state.database.countries[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, { fetchCountry , editCountry })(CountryEdit);