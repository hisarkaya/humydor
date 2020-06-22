import React from 'react';
import Header from './Header';
import Footer from './Footer';

import { connect } from 'react-redux';

class MemberTemplate extends React.Component {

    render() {

        const { isAuthenticated, pageCode, className, role, error, errorType, isLoading, children } = this.props;
        const templateClassName = `ui container hmy-page ${className}`;
        const errorMsgClass = `ui ${errorType || 'negative'} ${error ? 'visible' : 'hidden'} message`;
        const pageContainerClass = `ui hmy-page-container`;
        return (
            <div className="hmy-member-template">
                {
                    isLoading &&
                    <div className="ui active inverted dimmer">
                        <div className="ui loader"></div>
                    </div>
                }
                <Header isAuthenticated={isAuthenticated} role={role} selected={pageCode} />
                <div className={templateClassName}>
                    <div className={pageContainerClass}>
                        <div className={errorMsgClass}>
                            <p>{error}</p>
                        </div>
                        {children}
                        {
                            this.props.formMessage.time && (Date.now() - this.props.formMessage.time) < 5000 &&
                        <div className="ui bottom attached positive large message">
                            <i className="icon check"></i>
                            <strong>{`[${(Date.now() - this.props.formMessage.time) / 1000} sec ago]: `}</strong>
                            {this.props.formMessage.text}
                        </div>
                        }
                    </div>

                </div>
                <Footer isAuthenticated={isAuthenticated} />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isLoading: state.common.isContainerLoading,
        error: state.common.errorContainer,
        role: state.auth.user.role,
        formMessage: state.common.formMessage
    }
}

export default connect(mapStateToProps)(MemberTemplate);