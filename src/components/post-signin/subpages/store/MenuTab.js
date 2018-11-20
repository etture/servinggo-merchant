import React, {Component} from 'react';
import {connect} from 'react-redux';

class MenuTab extends Component {
    render() {
        return(
            <div>Menu tab</div>
        );
    }
}

function mapStateToProps(state){
    return {state};
}

export default connect(
    mapStateToProps
)(MenuTab);