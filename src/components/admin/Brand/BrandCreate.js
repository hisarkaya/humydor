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
                pageCode="database">

                <Toolbar header="add brand" >
                    <Link to="/brands" className="item">
                        <i className="list icon" />
                    </Link>
                </Toolbar>
                
                <BrandForm 
                    hideCancel={false}
                    form="brandFormCreate" 
                    onSubmit={this.onSubmit} 
                 />

            </MemberTemplate>
        );
    }
}

export default connect(null, { createBrand })(BrandCreate);