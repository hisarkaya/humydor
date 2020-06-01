import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MemberTemplate from '../../membership/MemberTemplate';
import NameForm from './NameForm';
import Toolbar from '../../membership/Toolbar';
import { createName, fetchBrands } from '../../../actions/database';


class NameCreate extends React.Component {

    componentDidMount() {
        this.props.fetchBrands();
    }

    onSubmit = formValues => {
        this.props.createName(formValues);
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

        return (
            <MemberTemplate
                className="hmy-name-create"
                pageCode="database"
                pageTitle="add cigar name">

                <Toolbar >
                    <Link to="/names" className="ui labeled icon blue button">
                        <i className="list icon" />List
                    </Link>
                </Toolbar>
                
                <NameForm 
                    onSubmit={this.onSubmit} 
                    brands={this.getBrandOption()} />

            </MemberTemplate>
        );
    }
}

const mapStateToProps = state => {
    return {
        brands: state.database.brands
    }
}

export default connect(mapStateToProps, { createName, fetchBrands })(NameCreate);