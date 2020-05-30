import React from 'react';
import { Link } from 'react-router-dom';

import MemberTemplate from '../../membership/MemberTemplate';
import Toolbar from '../../membership/Toolbar';


class CountryDisplay extends React.Component {
    render() {
        return (
            <MemberTemplate
                className="hmy-country-display"
                pageCode="database"
                pageTitle="country detail">

                <Toolbar >
                    <Link to="/countries" className="ui labeled icon blue button">
                        <i className="list icon" />List
                    </Link>
                </Toolbar>

            </MemberTemplate>
        );
        
    }
}


export default CountryDisplay;
