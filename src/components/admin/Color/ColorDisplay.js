import React from 'react';
import { Link } from 'react-router-dom';

import MemberTemplate from '../../membership/MemberTemplate';
import Toolbar from '../../membership/Toolbar';


class ColorDisplay extends React.Component {
    render() {
        return (
            <MemberTemplate
                className="hmy-color-display"
                pageCode="database"
                pageTitle="color detail">

                <Toolbar >
                    <Link to="/colors" className="ui labeled icon blue button">
                        <i className="list icon" />List
                    </Link>
                </Toolbar>

            </MemberTemplate>
        );
        
    }
}


export default ColorDisplay;
