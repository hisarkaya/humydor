import React from 'react';

const Toolbar = props => {
    return (
        <div style={{ 'textAlign': 'right' }}>
            <div className="ui small basic icon buttons">
                {props.children}
            </div>
        </div>
    );
}

export default Toolbar;