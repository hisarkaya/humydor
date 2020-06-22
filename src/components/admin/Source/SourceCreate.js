import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MemberTemplate from '../../membership/MemberTemplate';
import SourceForm from './SourceForm';
import Toolbar from '../../membership/Toolbar';
import { createSource } from '../../../actions/database';


class SourceCreate extends React.Component {

   
    onSubmit = formValues => {
        this.props.createSource(formValues);
    }

    render() {

        return (
            <MemberTemplate
                className="hmy-source-create"
                pageCode="database">

                <Toolbar header="add source" >
                    <Link to="/sources" className="item">
                        <i className="list icon" />
                    </Link>
                </Toolbar>
                
                <SourceForm 
                    hideCancel={false}
                    form="sourceFormCreate" 
                    onSubmit={this.onSubmit} 
                 />

            </MemberTemplate>
        );
    }
}

export default connect(null, { createSource })(SourceCreate);