import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../actions/index';

class YesOrNoModal extends Component {
    closeModal = () => {
        this.props.clearComp();
    };

    yes = (action) => {
        action();
        this.closeModal();
    };

    render() {
        const {yesOrNoModalShown, yesOrNoModalAction, yesOrNoModalTitle} = this.props;
        const className = yesOrNoModalShown ? 'modal is-active' : 'modal';

        return (
            <div className={className}>
                <div className="modal-background"/>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title is-small">{yesOrNoModalTitle}</p>
                        <button className="delete" aria-label="close" onClick={this.closeModal}/>
                    </header>
                    <footer className="modal-card-foot">
                        <button className="button is-danger"
                                onClick={() => this.yes(yesOrNoModalAction)}>
                            예
                        </button>
                        <button className="button" onClick={this.closeModal}>
                            아니오
                        </button>
                    </footer>
                </div>
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        yesOrNoModalShown: state.comp.yesOrNoModalShown,
        yesOrNoModalAction: state.comp.yesOrNoModalAction,
        yesOrNoModalTitle: state.comp.yesOrNoModalTitle
    };
}

export default connect(mapStateToProps, actions)(YesOrNoModal);