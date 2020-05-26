import React from 'react';
import { Redirect } from 'react-router-dom';

const CommonTemplate = (props) => {

    const { children, error, errorType, componentClass, isLoading,  isAuthenticated } = props;
    const errorMsgClass = `ui ${errorType || 'negative'} ${error ? 'visible' : 'hidden'} message`;
    const mainClass = `ui middle aligned center aligned grid ${componentClass}`
    const columnClass = `ui basic ${isLoading ? 'loading': ''} segment column`;

    if (isAuthenticated) {
        return <Redirect to="/" />;
    } else {
        return (
            <div className={mainClass}>
                <div className={columnClass}>
                    <h2 className="ui blue image header">
                        <i className="leaf icon"></i>
                        <div className="content">
                            humydor
                    </div>
                    </h2>
                    <div className={errorMsgClass}>
                        <p>{props.error}</p>
                    </div>
                    {children}
                </div>
            </div>
        );
    }
}

export default CommonTemplate;