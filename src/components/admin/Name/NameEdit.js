import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MemberTemplate from '../../membership/MemberTemplate';
import NameForm from './NameForm';

import Toolbar from '../../membership/Toolbar';
import { fetchName, editName, fetchBrands } from '../../../actions/database';

class NameEdit extends React.Component {

    componentDidMount = () => {
        this.props.fetchBrands();
        this.props.fetchName(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.editName(this.props.match.params.id, formValues);
    }

    getBrandOption = () => {
        const { brands } = this.props;
        var options = [];
        if (brands) {
            Object.keys(brands).forEach(id => {
                var brand = brands[id];
                options.push({
                    flag: brand.country.code,
                    key: id,
                    text: `${brand.name} (${brand.country.name})`,
                    value: id
                });
            });
        }
        return options;
    }

    render() {
        if (!this.props.name) {
            return null;
        }

        return (
            <MemberTemplate
                className="hmy-name-create"
                pageCode="database"
                pageTitle="edit name">

                <Toolbar >
                    <Link to="/names" className="ui labeled icon blue button">
                        <i className="list icon" />List
                    </Link>
                </Toolbar>
    
                <NameForm
                 initialValues={{title:this.props.name.title, brandId: this.props.name.brand.id}}
                 onSubmit={this.onSubmit} 
                 brands={this.getBrandOption()}
                 />

            </MemberTemplate>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        name: state.database.names[ownProps.match.params.id],
        brands: state.database.brands
    }
}

export default connect(mapStateToProps, { fetchName , editName, fetchBrands })(NameEdit);