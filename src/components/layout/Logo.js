import React from 'react';

import './LogoStyle.css';

export default () => {
    return (
        <div className="img-parent">
            <img className='signin-img' src={window.location.origin + '/images/logo_only_white.png'}/>
        </div>
    );
};