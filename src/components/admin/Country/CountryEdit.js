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

        const { country, formMessage } = this.props;


        if (!country) {
            return null;
        }

        return (

            <MemberTemplate
                className="hmy-country-create"
                pageCode="database">

                <Toolbar header="edit country">
                    <Link to="/countries/new" className="item">
                        <i className="plus blue icon" />
                    </Link>
                    <Link to="/countries" className="item">
                        <i className="list icon" />
                    </Link>
                </Toolbar>

                <CountryForm
                    hideCancel={formMessage.time && (Date.now() - formMessage.time < 5000 )}
                    form="countryFormEdit"
                    initialValues={{ code: country.code, name: country.name }}
                    onSubmit={this.onSubmit}
                />

            </MemberTemplate>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        country: state.database.countries[ownProps.match.params.id],
        formMessage: state.common.formMessage
    }
}

export default connect(mapStateToProps, { fetchCountry, editCountry })(CountryEdit);