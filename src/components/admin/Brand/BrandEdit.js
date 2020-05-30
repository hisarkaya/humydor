import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MemberTemplate from '../../membership/MemberTemplate';
import BrandForm from './BrandForm';

import Toolbar from '../../membership/Toolbar';
import { fetchBrand, editBrand } from '../../../actions/database';

class BrandEdit extends React.Component {

    componentDidMount = () => {
        this.props.fetchBrand(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.editBrand(this.props.match.params.id, formValues);
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
                    <Link to="/countries" className="ui labeled icon blue button">
                        <i className="list icon" />List
                    </Link>
                </Toolbar>
    
                <BrandForm
                 initialValues={this.props.brand}
                 onSubmit={this.onSubmit} 
                 />

            </MemberTemplate>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        brand: state.database.countries[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, { fetchBrand , editBrand })(BrandEdit);