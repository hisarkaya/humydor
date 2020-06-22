import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MemberTemplate from '../../membership/MemberTemplate';
import ColorForm from './ColorForm';

import Toolbar from '../../membership/Toolbar';
import { fetchColor, editColor } from '../../../actions/database';

class ColorEdit extends React.Component {

    componentDidMount = () => {
        this.props.fetchColor(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.editColor(this.props.match.params.id, formValues);
    }

    render() {

        const { color, formMessage } = this.props;


        if (!color) {
            return null;
        }

        return (

            <MemberTemplate
                className="hmy-color-create"
                pageCode="database">

                <Toolbar header="edit color">
                    <Link to="/colors/new" className="item">
                        <i className="plus blue icon" />
                    </Link>
                    <Link to="/colors" className="item">
                        <i className="list icon" />
                    </Link>
                </Toolbar>

                <ColorForm
                    hideCancel={formMessage.time && (Date.now() - formMessage.time < 5000 )}
                    form="colorFormEdit"
                    initialValues={{ code: color.code, name: color.name, order: color.order }}
                    onSubmit={this.onSubmit}
                />

            </MemberTemplate>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        color: state.database.colors[ownProps.match.params.id],
        formMessage: state.common.formMessage
    }
}

export default connect(mapStateToProps, { fetchColor, editColor })(ColorEdit);