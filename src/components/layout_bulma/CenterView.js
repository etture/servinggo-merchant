import React from 'react';

export default (props) => {
    return(
        <div className="columns">
            <div className="column is-2"/>
            <div className="column">
                {props.children}
            </div>
            <div className="column is-2"/>
        </div>
    );
}