import React from 'react';
import { connect } from 'react-redux';

const Footer = (props) => {

    if (!props.isAuthenticated) {
        return null;
    }

    return (
        <div className="ui middle aligned center aligned grid hmy-footer">
            <div className="column">
                <b>Copyright &copy; 2020 Hesharp LTD</b>. All rights reserved.
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(Footer);