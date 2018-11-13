import React from 'react';

import './FieldCardStyle.css';

export default (props) => {
    return (
        <div className="card rounded">
            {props.children}
        </div>
    );
}