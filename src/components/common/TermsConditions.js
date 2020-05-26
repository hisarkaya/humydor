import React from 'react';
import CommonTemplate from './CommonTemplate';
import { connect } from 'react-redux';

const TermsConditions = (props) => {
    return (
        <CommonTemplate isAuthenticated={props.isAuthenticated} componentClass="hmy-terms-and-conditions">
            <div className="ui segment">
                <h2>Terms and Conditions ("Terms")</h2>

                <p style={{'textAlign':'left'}}>Last updated: 23 May 2020</p>

                <p style={{'textAlign':'left'}}>Please read these Terms and Conditions ("Terms", "Terms and Conditions") 
                    carefully before using the <a href="/">https://www.humydor.com</a> website operated by  
                    
                    <strong> Hesharp LTD </strong> ("us", "we", or "our"). Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. 
                    These Terms apply to all visitors, users and others who access or use the Service.
                    By accessing or using the Service you agree to be bound by these Terms. 
                    If you disagree with any part of the terms then you may not access the Service.
                </p>
                <h3>Content</h3>
                <p style={{'textAlign':'left'}}>Our Service allows you to post, link, store, share and otherwise make 
                    available certain information, text, graphics, videos, or other material ("Content").
                </p>

                <h3>Links To Other Web Sites</h3>
                <p style={{'textAlign':'left'}}>Our Service may contain links to third-party web sites or services 
                    that are not owned or controlled by <strong> Hesharp LTD</strong>.
                    <strong> Hesharp LTD </strong> has no control over, and assumes no responsibility for, the content, 
                    privacy policies, or practices of any third party web sites or services. You further acknowledge 
                    and agree that Hesharp LTD shall not be responsible or liable, directly or indirectly, 
                    for any damage or loss caused or alleged to be caused by or in connection with use of or 
                    reliance on any such content, goods or services available on or through any such web sites or services.
                </p>

                <h3>Changes</h3>
                <p style={{'textAlign':'left'}}>We reserve the right, at our sole discretion, to modify or replace 
                    these Terms at any time. If a revision is material we will try to provide at least 10 days' 
                    notice prior to any new terms taking effect. What constitutes a material change will be determined 
                    at our sole discretion.
                </p>

                <h3>Contact Us</h3>
                <p style={{'textAlign':'left'}}>If you have any questions about these Terms, please contact us.</p>
            </div>

        </CommonTemplate>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}
export default connect(mapStateToProps)(TermsConditions);