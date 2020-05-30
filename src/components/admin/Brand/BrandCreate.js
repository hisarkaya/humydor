import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MemberTemplate from '../../membership/MemberTemplate';
import BrandForm from './BrandForm';
import Toolbar from '../../membership/Toolbar';
import { createBrand } from '../../../actions/database';

class BrandCreate extends React.Component {

    onSubmit = formValues => {
        this.props.createBrand(formValues);
    }

    render() {
        return (
            <MemberTemplate
                className="hmy-brand-create"
                pageCode="database"
                pageTitle="add brand">

                <Toolbar >
                    <Link to="/countries" className="ui labeled icon blue button">
                        <i className="list icon" />List
                    </Link>
                </Toolbar>
                
                <BrandForm onSubmit={this.onSubmit} />

            </MemberTemplate>
        );
    }
}

export default connect(null, { createBrand })(BrandCreate);