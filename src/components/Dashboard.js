import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';

class Dashboard extends Component {
    onClick() {
        this.props.signout(() => {
            this.props.history.push('/signin');
        });
    }

    render(){
        return(
            <div>
                서빙고 대시보드
                <button onClick={this.onClick.bind(this)} className="btn btn-primary">Sign Out</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {state};
}

export default connect(mapStateToProps, actions)(Dashboard);