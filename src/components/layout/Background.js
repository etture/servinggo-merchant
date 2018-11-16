import React from 'react';

import './BackgroundStyle.css';

export default (props) => {
    return (
        <div className="bg bg-white">
            {props.children}
        </div>
    );
}