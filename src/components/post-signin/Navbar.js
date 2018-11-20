import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../actions/index';

class Navbar extends Component {
    onClick() {
        this.props.signout(() => {
            this.props.history.push('/signin');
        });
    }

    render() {
        return (
            <div>
                <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href={window.location.origin + '/'}>
                            <img src={window.location.origin + '/images/servinggo_primary_logo_eng_temp_2.png'}
                                 alt="Servinggo logo"/>
                        </a>
                        <div className="navbar-burger" data-target="navbarMenu">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </div>
                    </div>

                    <div id="navbarMenu" className="navbar-menu">
                        <div className="navbar-start">

                            <a className="navbar-item"
                               href={window.location.origin + '/dashboard/stores'}
                               style={{textDecoration: "none"}}>홈</a>

                            {/*<div className="navbar-item has-dropdown is-hoverable">*/}
                            {/*<a className="navbar-link">더 보기</a>*/}
                            {/*<div className="navbar-dropdown is-boxed">*/}
                            {/*<a className="navbar-item">정보</a>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                        </div>

                        <div className="navbar-end">
                            <div className="navbar-item is-active">
                                <div className="buttons">
                                    <button onClick={this.onClick.bind(this)}
                                            className="button">로그아웃
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <hr style={{margin: '0em'}}/>
                <br/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {state};
}

export default connect(mapStateToProps, actions)(Navbar);