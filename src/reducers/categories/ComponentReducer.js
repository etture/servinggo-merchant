import {
    COMP_ERROR,
    COMP_SHOW_YESORNO_MODAL,
    COMP_CLEAR
} from "../../actions/types";

const INITIAL_STATE = {
    yesOrNoModalShown: false,
    yesOrNoModalAction: '',
    yesOrNoModalTitle: '',
    errorMessage: ''
};

export default function(state=INITIAL_STATE, action) {
    switch(action.type){
        case COMP_SHOW_YESORNO_MODAL:
            return {
                ...state,
                yesOrNoModalShown: action.payload.isShown,
                yesOrNoModalAction: action.payload.yesAction,
                yesOrNoModalTitle: action.payload.title
            };
        case COMP_CLEAR:
            return INITIAL_STATE;
        case COMP_ERROR:
            return {
                ...state,
                errorMessage: ''
            };
        default:
            return state;
    }
}