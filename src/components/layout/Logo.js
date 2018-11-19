import React from 'react';

import './LogoStyle.css';

export default () => {
    return (
        <div className="img-parent">
            <img className='signin-img' src={window.location.origin + '/images/servinggo_primary_logo_eng_temp.png'} alt="Logo"/>
        </div>
    );
};