import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MemberTemplate from '../../membership/MemberTemplate';
import ShapeForm from './ShapeForm';

import Toolbar from '../../membership/Toolbar';
import { fetchShape, editShape } from '../../../actions/database';

class ShapeEdit extends React.Component {

    componentDidMount = () => {
        this.props.fetchShape(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.editShape(this.props.match.params.id, formValues);
    }

    render() {

        const { shape, formMessage } = this.props;


        if (!shape) {
            return null;
        }

        return (

            <MemberTemplate
                className="hmy-shape-create"
                pageCode="database">

                <Toolbar header="edit shape">
                    <Link to="/shapes/new" className="item">
                        <i className="plus blue icon" />
                    </Link>
                    <Link to="/shapes" className="item">
                        <i className="list icon" />
                    </Link>
                </Toolbar>

                <ShapeForm
                    hideCancel={formMessage.time && (Date.now() - formMessage.time < 5000 )}
                    form="shapeFormEdit"
                    initialValues={{ name: shape.name }}
                    onSubmit={this.onSubmit}
                />

            </MemberTemplate>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        shape: state.database.shapes[ownProps.match.params.id],
        formMessage: state.common.formMessage
    }
}

export default connect(mapStateToProps, { fetchShape, editShape })(ShapeEdit);