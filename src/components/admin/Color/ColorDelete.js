import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MemberTemplate from '../../membership/MemberTemplate';
import Modal from '../../Modal';
import history from '../../../history';
import { fetchColor, deleteColor } from '../../../actions/database';

class ColorDelete extends React.Component {

    componentDidMount() {
        this.props.fetchColor(this.props.match.params.id);
    }


    renderContent = () => {
        if (!this.props.color) {
            return 'are you sure you want to delete this color?';
        } else {
            return `are you sure you want to delete this color with name: ${this.props.color.name}?`;

        }
    }

    renderActions = () => {
        return (
            <React.Fragment>
                <button 
                    className="ui button negative"
                    onClick={() => this.props.deleteColor(this.props.match.params.id)}>delete</button>
                <Link to="/colors" className="ui button">cancel</Link>
            </React.Fragment>
        );
    }

    render() {
        return (
            <MemberTemplate
                className="hmy-color-delete"
                pageCode="database"
                pageTitle="delete color">
                
                <Modal 
                    title="delete color"
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
        color: state.database.colors && state.database.colors[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, { fetchColor, deleteColor })(ColorDelete);