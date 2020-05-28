import React from 'react';
import MemberTemplate from './MemberTemplate';

class Cigars extends React.Component {
    render() {
        return (
            <MemberTemplate
                className="hmy-cigars"
                pageCode="cigars"
                pageTitle="Cigars">
                <div className="ui segment">
                The cigars content
                </div>
            </MemberTemplate>
        );
    }
}

export default Cigars;