import React from 'react';
import MemberTemplate from './MemberTemplate';

class Cigars extends React.Component {
    render() {
        return (
            <MemberTemplate
                className="hmy-cigars"
                pageCode="cigars"
                pageTitle="cigars">
               
                The cigars content
             
            </MemberTemplate>
        );
    }
}

export default Cigars;