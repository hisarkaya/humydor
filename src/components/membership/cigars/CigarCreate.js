import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MemberTemplate from '../MemberTemplate';
import CigarForm from './CigarForm';
import Toolbar from '../Toolbar';
import { createCigar } from '../../../actions/cigar';
import { fetchBrands } from '../../../actions/database';


class CigarCreate extends React.Component {

    componentDidMount() {
        this.props.fetchBrands();
    }

    onSubmit = formValues => {
        this.props.createCigar(formValues);
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
                className="hmy-cigar-create"
                pageCode="cigars"
                pageTitle="add cigar name">

                <Toolbar >
                    <Link to="/cigars" className="ui labeled icon blue button">
                        <i className="list icon" />List
                    </Link>
                </Toolbar>
                
                <CigarForm 
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

export default connect(mapStateToProps, { createCigar, fetchBrands })(CigarCreate);