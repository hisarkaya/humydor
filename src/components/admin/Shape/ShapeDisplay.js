import React from 'react';
import { Link } from 'react-router-dom';

import MemberTemplate from '../../membership/MemberTemplate';
import Toolbar from '../../membership/Toolbar';


class ShapeDisplay extends React.Component {
    render() {
        return (
            <MemberTemplate
                className="hmy-shape-display"
                pageCode="database"
                pageTitle="shape detail">

                <Toolbar >
                    <Link to="/shapes" className="ui labeled icon blue button">
                        <i className="list icon" />List
                    </Link>
                </Toolbar>

            </MemberTemplate>
        );
        
    }
}


export default ShapeDisplay;
