import React, {Component} from 'react';

import './CenterViewStyle.css';

export default class CenterView extends Component{
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col"></div>
                    <div className="col-10 col-sm-10 col-md-8 col-lg-6 col-xl-6">
                        {this.props.children}
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        );
    }
}