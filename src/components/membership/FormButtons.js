import React from 'react';
import history from '../../history';

const FormButtons = props => {
    return (
        <div style={{ 'textAlign': 'left' }}>
            {
                !props.hideCancel && 
                <button type="button" onClick={history.goBack} className="ui basic negative big button">cancel</button>
            }
            <button className="ui big button primary">save</button>
        </div>
    );
}

export default FormButtons;
