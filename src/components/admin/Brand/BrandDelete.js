import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MemberTemplate from '../../membership/MemberTemplate';
import Modal from '../../Modal';
import history from '../../../history';
import { fetchBrand, deleteBrand } from '../../../actions/database';

class BrandDelete extends React.Component {

    componentDidMount() {
        this.props.fetchBrand(this.props.match.params.id);
    }


    renderContent = () => {
        if (!this.props.Brand) {
            return 'are you sure you want to delete this brand?';
        } else {
            return `are you sure you want to delete this brand with name: ${this.props.brand.name}?`;

        }
    }

    renderActions = () => {
        return (
            <React.Fragment>
                <button 
                    className="ui button negative"
                    onClick={() => this.props.deleteBrand(this.props.match.params.id)}>delete</button>
                <Link to="/countries" className="ui button">cancel</Link>
            </React.Fragment>
        );
    }

    render() {
        return (
            <MemberTemplate
                className="hmy-brand-delete"
                pageCode="database"
                pageTitle="delete brand">
                
                <Modal 
                    title="delete brand"
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
        brand: state.database.countries && state.database.countries[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, { fetchBrand, deleteBrand })(BrandDelete);