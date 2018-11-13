import React from 'react';

import './GradientBackgroundStyle.css';

export default (props) => {
    return (
        <div className="bg">
            {props.children}
        </div>
    );
}