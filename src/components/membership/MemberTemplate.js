import React from 'react';
import Header from './Header';
import Breadcrumb from './Breadcrumb';
import Footer from './Footer';

import { connect } from 'react-redux';

class MemberTemplate extends React.Component {

    render() {
        const { isAuthenticated, pageCode, pageTitle, className, role, error, errorType, isLoading, children } = this.props;
        const templateClassName = `ui container hmy-page ${className}`;
        const errorMsgClass = `ui ${errorType || 'negative'} ${error ? 'visible' : 'hidden'} message`;
        const pageContainerClass = `ui ${isLoading ? 'loading' : ''} segment hmy-page-container`;
        return (
            <div className="hmy-member-template">
                <Header isAuthenticated={isAuthenticated} role={role} selected={pageCode}  />
                <div className={templateClassName}>
                    <Breadcrumb isAuthenticated={isAuthenticated} text={pageTitle} />
                    <div className={pageContainerClass}>
                        <div className={errorMsgClass}>
                            <p>{error}</p>
                        </div>
                        {children}
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
        isLoading: state.auth.isContainerLoading,
        error: state.auth.errorContainer,
        role: state.auth.user.role
    }
}

export default connect(mapStateToProps)(MemberTemplate);