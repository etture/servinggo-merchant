import {
    COMP_ERROR,
    COMP_SHOW_YESORNO_MODAL,
    COMP_CLEAR
} from "../types";

import {action} from "../utils";

export const showYesOrNoModal = (isShown, yesAction, title) => dispatch => {
    if(!yesAction) yesAction = '';
    dispatch(action(COMP_SHOW_YESORNO_MODAL, {isShown, yesAction, title}));
};

export const clearComp = () => dispatch => {
    dispatch(action(COMP_CLEAR, ''));
};