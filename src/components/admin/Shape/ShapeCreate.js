import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MemberTemplate from '../../membership/MemberTemplate';
import ShapeForm from './ShapeForm';
import Toolbar from '../../membership/Toolbar';
import { fetchCountries, createShape } from '../../../actions/database';

class ShapeCreate extends React.Component {

    componentDidMount() {
        this.props.fetchCountries();
    }

    onSubmit = formValues => {
        this.props.createShape(formValues);
    }

    render() {
        return (
            <MemberTemplate
                className="hmy-shape-create"
                pageCode="database">

                <Toolbar header="add shape" >
                    <Link to="/shapes" className="item">
                        <i className="list icon" />
                    </Link>
                </Toolbar>
                
                <ShapeForm
                    shapes={this.props.shapes}
                    hideCancel={false}
                    form="shapeFormCreate" 
                    onSubmit={this.onSubmit} />

            </MemberTemplate>
        );
    }
}


const mapStateToProps = state => {
    return {
        shapes: state.database.shapes
    }
}

export default connect(mapStateToProps, { createShape, fetchCountries })(ShapeCreate);