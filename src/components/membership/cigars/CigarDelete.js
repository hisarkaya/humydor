import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MemberTemplate from '../MemberTemplate';
import Modal from '../../Modal';
import history from '../../../history';
import { fetchName, deleteName } from '../../../actions/database';

class NameDelete extends React.Component {

    componentDidMount() {
        this.props.fetchName(this.props.match.params.id);
    }


    renderContent = () => {
        if (!this.props.name) {
            return 'are you sure you want to delete this name?';
        } else {
            return `are you sure you want to delete this name with title: ${this.props.name.title}?`;

        }
    }

    renderActions = () => {
        return (
            <React.Fragment>
                <button 
                    className="ui button negative"
                    onClick={() => this.props.deleteName(this.props.match.params.id)}>delete</button>
                <Link to="/names" className="ui button">cancel</Link>
            </React.Fragment>
        );
    }

    render() {
        return (
            <MemberTemplate
                className="hmy-name-delete"
                pageCode="database"
                pageTitle="delete name">
                
                <Modal 
                    title="delete name"
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
        name: state.database.brands && state.database.names[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, { fetchName, deleteName })(NameDelete);