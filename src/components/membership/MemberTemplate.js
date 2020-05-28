import React from 'react';
import Header from './Header';
import Breadcrumb from './Breadcrumb';
import Footer from './Footer';

import { connect } from 'react-redux';

class MemberTemplate extends React.Component {

    render() {
        const { isAuthenticated, pageCode, pageTitle, className } = this.props;
        const templateClassName = `ui container hmy-page ${className}`;
        return (
            <div className="hmy-member-template">
                <Header isAuthenticated={isAuthenticated} selected={pageCode}  />
                <div className={templateClassName}>
                    <Breadcrumb isAuthenticated={isAuthenticated} text={pageTitle} />
                    <div className="hmy-page-container">
                        {this.props.children}
                    </div>
                    
                </div>
                <Footer isAuthenticated={isAuthenticated} />
            </div>
        );
    }
    
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(MemberTemplate);