import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MemberTemplate from '../../membership/MemberTemplate';
import Modal from '../../Modal';
import history from '../../../history';
import { fetchShape, deleteShape } from '../../../actions/database';

class ShapeDelete extends React.Component {

    componentDidMount() {
        this.props.fetchShape(this.props.match.params.id);
    }


    renderContent = () => {
        if (!this.props.shape) {
            return 'are you sure you want to delete this shape?';
        } else {
            return `are you sure you want to delete this shape with name: ${this.props.shape.name}?`;

        }
    }

    renderActions = () => {
        return (
            <React.Fragment>
                <button 
                    className="ui button negative"
                    onClick={() => this.props.deleteShape(this.props.match.params.id)}>delete</button>
                <Link to="/shapes" className="ui button">cancel</Link>
            </React.Fragment>
        );
    }

    render() {
        return (
            <MemberTemplate
                className="hmy-shape-delete"
                pageCode="database"
                pageTitle="delete shape">
                
                <Modal 
                    title="delete shape"
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
        shape: state.database.shapes && state.database.shapes[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, { fetchShape, deleteShape })(ShapeDelete);