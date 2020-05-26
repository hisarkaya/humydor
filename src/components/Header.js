import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import  { signout } from '../actions/auth';

class Header extends React.Component {

    signOutClick = () => {
        this.props.signout();
    }
    render() {

        if (!this.props.isAuthenticated) {
            return null;
        }

        return (
            <div className="ui top large menu">
                <div className="ui container">
                    <Link className="header item" to="/">
                        <i className="icon leaf" /> Humydor.com
                    </Link>
                    <div className="right menu">
                        <a href="#logout" className="item" onClick={this.signOutClick}>
                            <i className="icon sign-out" /> Sign out
                        </a>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, { signout })(Header);