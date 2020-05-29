import React from 'react';

const Breadcrumb = props => {

    if (!props.isAuthenticated) {
        return null;
    }

    return (
        <h2 className="ui header">{props.text}</h2>
    );
}

export default Breadcrumb;