import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MemberTemplate from '../MemberTemplate';
import CigarForm from './CigarForm';

import Toolbar from '../Toolbar';
import { fetchBrands } from '../../../actions/database';
import { fetchCigar, editCigar } from '../../../actions/cigar';

class NameEdit extends React.Component {

    componentDidMount = () => {
        this.props.fetchBrands();
        this.props.fetchCigar(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.editCigar(this.props.match.params.id, formValues);
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
        if (!this.props.cigar) {
            return null;
        }

        return (
            <MemberTemplate
                className="hmy-cigar-edit"
                pageCode="database"
                pageTitle="edit cigar">

                <Toolbar >
                    <Link to="/cigars" className="ui labeled icon blue button">
                        <i className="list icon" />List
                    </Link>
                </Toolbar>
    
                <CigarForm
                  brand={this.props.cigar.brand.name}
                 initialValues={{name:this.props.cigar.name, brandId: this.props.cigar.brand.id}}
                 onSubmit={this.onSubmit} 
                 brands={this.getBrandOption()}
                 />

            </MemberTemplate>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        cigar: state.cigars[ownProps.match.params.id],
        brands: state.database.brands
    }
}

export default connect(mapStateToProps, { fetchCigar , editCigar, fetchBrands })(NameEdit);