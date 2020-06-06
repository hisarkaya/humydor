import React from 'react';

const Toolbar = props => {
    return (
        <div className="ui icon top attached  menu">
            <div className="header item">
                <h2>{props.header}</h2>
            </div>
            <div className="right menu">
                {props.children}
            </div>
        </div>
    );
}

export default Toolbar;