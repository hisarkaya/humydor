import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAuth } from '../../actions/auth';
import { isMobileOnly } from 'react-device-detect';

import CommonTemplate from './CommonTemplate';

class SMUAuth extends React.Component {

    onFacebookClick = () => {
        this.props.getAuth(isMobileOnly ? 'redirect' : 'popup', 'facebook', this.props.source);
    }

    onGoogleClick = () => {
        this.props.getAuth(isMobileOnly ? 'redirect' : 'popup', 'google', this.props.source);
    }

    renderStep = () => {
        if (this.props.source !== 'signup') {
            return null;
        }
        return (
            <div className="ui two top attached tiny unstackable steps">
                <a href="#1" className="active step">
                    <div className="content">
                        <div className="title">1. Sign up with</div>
                    </div>
                </a>
                <a href="#2" className="disabled step">
                    <div className="content">
                        <div className="title">2. Complete</div>
                    </div>
                </a>
            </div>
        );
    }

    render() {
        const { isAuthenticated,
            isContainerLoading,
            errorContainer,
            source,
            header,
            footer,
            toggleText,
            buttonText,
            content
        } = this.props;

        return (
            <CommonTemplate
            
                isLoading={isContainerLoading}
                isAuthenticated={isAuthenticated}
                error={errorContainer && errorContainer.message}
                componentClass={`hmy-${source}`}
            >

                {this.renderStep()}

                <div className="ui segments">
                    <div className="ui segment">
                        <div className="ui basic segment">
                            <h3 className="ui header center aligned">
                                {header}
                                <div className="sub header" style={{ 'marginTop': '5px' }}>
                                    {content}
                                </div>
                            </h3>
                        </div>
                        <div className="ui">
                            <button
                                onClick={this.onFacebookClick}
                                className="fluid ui facebook large button">
                                <i className="facebook icon"></i>
                                {buttonText} Facebook
                            </button>
                            <div className="ui horizontal divider">
                                Or
                            </div>
                            <button
                                onClick={this.onGoogleClick}
                                className="fluid ui google plus large button">
                                <i className="google icon"></i>
                                {buttonText} Google
                            </button>
                        </div>
                    </div>
                    <div className="ui secondary segment">
                        {footer} <Link to={`/${source === 'signin' ? 'signup' : 'signin'}`}>{toggleText}</Link>
                    </div>
                </div>
            </CommonTemplate>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isContainerLoading: state.auth.isContainerLoading,
        errorContainer: state.auth.errorContainer
    }
}
export default connect(mapStateToProps, { getAuth })(SMUAuth);