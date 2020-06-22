import React from 'react';
import { Link } from 'react-router-dom';

import MemberTemplate from '../../membership/MemberTemplate';
import Toolbar from '../../membership/Toolbar';


class SourceDisplay extends React.Component {
    render() {
        return (
            <MemberTemplate
                className="hmy-source-display"
                pageCode="database"
                pageTitle="source detail">

                <Toolbar >
                    <Link to="/sources" className="ui labeled icon blue button">
                        <i className="list icon" />List
                    </Link>
                </Toolbar>

            </MemberTemplate>
        );
        
    }
}


export default SourceDisplay;
