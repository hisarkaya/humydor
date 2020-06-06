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

        const { brand, formMessage } = this.props;

        if (!brand) {
            return null;
        }

        return (
            <MemberTemplate
                className="hmy-brand-create"
                pageCode="database">

                <Toolbar header="edit brand">
                    <Link to="/brands/new" className="item">
                        <i className="plus blue icon" />
                    </Link>
                    <Link to="/brands" className="item">
                        <i className="list icon" />
                    </Link>
                </Toolbar>

                <BrandForm
                    hideCancel={formMessage.time && (Date.now() - formMessage.time < 5000)}
                    form="brandFormEdit"
                    initialValues={{ name: brand.name}}
                    onSubmit={this.onSubmit}
                />

            </MemberTemplate>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        brand: state.database.brands[ownProps.match.params.id],
        formMessage: state.common.formMessage
    }
}

export default connect(mapStateToProps, { fetchBrand, editBrand })(BrandEdit);