import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MemberTemplate from '../../membership/MemberTemplate';
import SourceForm from './SourceForm';

import Toolbar from '../../membership/Toolbar';
import { fetchSource, editSource } from '../../../actions/database';

class SourceEdit extends React.Component {

    componentDidMount = () => {
        this.props.fetchSource(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.editSource(this.props.match.params.id, formValues);
    }

    render() {

        const { source, formMessage } = this.props;

        if (!source) {
            return null;
        }

        return (
            <MemberTemplate
                className="hmy-source-create"
                pageCode="database">

                <Toolbar header="edit source">
                    <Link to="/sources/new" className="item">
                        <i className="plus blue icon" />
                    </Link>
                    <Link to="/sources" className="item">
                        <i className="list icon" />
                    </Link>
                </Toolbar>

                <SourceForm
                    hideCancel={formMessage.time && (Date.now() - formMessage.time < 5000)}
                    form="sourceFormEdit"
                    initialValues={{ name: source.name}}
                    onSubmit={this.onSubmit}
                />

            </MemberTemplate>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        source: state.database.sources[ownProps.match.params.id],
        formMessage: state.common.formMessage
    }
}

export default connect(mapStateToProps, { fetchSource, editSource })(SourceEdit);