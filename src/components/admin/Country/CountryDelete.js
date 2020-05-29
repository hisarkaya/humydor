import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MemberTemplate from '../../membership/MemberTemplate';
import Modal from '../../Modal';
import history from '../../../history';
import { fetchCountry, deleteCountry } from '../../../actions/database';

class CountryDelete extends React.Component {

    componentDidMount() {
        this.props.fetchCountry(this.props.match.params.id);
    }


    renderContent = () => {
        if (!this.props.country) {
            return 'are you sure you want to delete this country?';
        } else {
            return `are you sure you want to delete this country with name: ${this.props.country.name}?`;

        }
    }

    renderActions = () => {
        return (
            <React.Fragment>
                <button 
                    className="ui button negative"
                    onClick={() => this.props.deleteCountry(this.props.match.params.id)}>delete</button>
                <Link to="/countries" className="ui button">cancel</Link>
            </React.Fragment>
        );
    }

    render() {
        return (
            <MemberTemplate
                className="hmy-country-delete"
                pageCode="database"
                pageTitle="delete country">
                
                <Modal 
                    title="delete country"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/')}
                />

            </MemberTemplate>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        country: state.database.countries && state.database.countries[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, { fetchCountry, deleteCountry })(CountryDelete);