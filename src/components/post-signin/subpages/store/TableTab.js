import React, {Component} from 'react';
import {connect} from 'react-redux';

class TableTab extends Component {
    render() {
        return (
            <div>Table tab</div>
        );
    }
}

function mapStateToProps(state) {
    return {state};
}

export default connect(
    mapStateToProps
)(TableTab);