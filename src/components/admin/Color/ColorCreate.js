import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MemberTemplate from '../../membership/MemberTemplate';
import ColorForm from './ColorForm';
import Toolbar from '../../membership/Toolbar';
import { fetchColors, createColor } from '../../../actions/database';

class ColorCreate extends React.Component {

    componentDidMount() {
        this.props.fetchColors();
    }

    onSubmit = formValues => {
        this.props.createColor(formValues);
    }

    render() {
        return (
            <MemberTemplate
                className="hmy-color-create"
                pageCode="database">

                <Toolbar header="add color" >
                    <Link to="/colors" className="item">
                        <i className="list icon" />
                    </Link>
                </Toolbar>
                
                <ColorForm
                    colors={this.props.colors}
                    hideCancel={false}
                    form="colorFormCreate" 
                    onSubmit={this.onSubmit} />

            </MemberTemplate>
        );
    }
}


const mapStateToProps = state => {
    return {
        colors: state.database.colors
    }
}

export default connect(mapStateToProps, { createColor, fetchColors })(ColorCreate);