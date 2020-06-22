import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MemberTemplate from '../../membership/MemberTemplate';
import Modal from '../../Modal';
import history from '../../../history';
import { fetchSource, deleteSource } from '../../../actions/database';

class SourceDelete extends React.Component {

    componentDidMount() {
        this.props.fetchSource(this.props.match.params.id);
    }


    renderContent = () => {
        if (!this.props.source) {
            return 'are you sure you want to delete this source?';
        } else {
            return `are you sure you want to delete this source with name: ${this.props.source.name}?`;

        }
    }

    renderActions = () => {
        return (
            <React.Fragment>
                <button 
                    className="ui button negative"
                    onClick={() => this.props.deleteSource(this.props.match.params.id)}>delete</button>
                <Link to="/sources" className="ui button">cancel</Link>
            </React.Fragment>
        );
    }

    render() {
        return (
            <MemberTemplate
                className="hmy-source-delete"
                pageCode="database"
                pageTitle="delete source">
                
                <Modal 
                    title="delete source"
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
        source: state.database.sources && state.database.sources[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, { fetchSource, deleteSource })(SourceDelete);