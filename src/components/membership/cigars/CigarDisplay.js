import React from 'react';
import { Link } from 'react-router-dom';

import MemberTemplate from '../MemberTemplate';
import Toolbar from '../Toolbar';


class BrandDisplay extends React.Component {
    render() {
        return (
            <MemberTemplate
                className="hmy-brand-display"
                pageCode="database"
                pageTitle="brand detail">

                <Toolbar >
                    <Link to="/brands" className="ui labeled icon blue button">
                        <i className="list icon" />List
                    </Link>
                </Toolbar>

            </MemberTemplate>
        );
        
    }
}


export default BrandDisplay;
