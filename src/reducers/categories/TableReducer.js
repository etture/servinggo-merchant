import {
    TABLE_ERROR,
    TABLE_SHOW_TABLE_MODAL,
    TABLE_GET_TABLES,
    TABLE_ADD,
    TABLE_REMOVE,
    TABLE_CLEAR,
    TABLE_DOWNLOAD_QR
} from "../../actions/types";

const INITIAL_STATE = {
    registeredTables: [],
    lastTableNum: 0,
    tableModalShown: false,
    selectedTableNum: 0,
    errorMessage: ''
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case TABLE_GET_TABLES:
            return {
                ...state,
                registeredTables: action.payload,
                lastTableNum: action.payload.length
            };
        case TABLE_ADD:
            return {
                ...state,
                errorMessage: ''
            };
        case TABLE_REMOVE:
            return {
                ...state,
                errorMessage: ''
            };
        case TABLE_SHOW_TABLE_MODAL:
            return {
                ...state,
                tableModalShown: action.payload.isShown,
                selectedTableNum: action.payload.tableNum
            };
        case TABLE_CLEAR:
            return INITIAL_STATE;
        case TABLE_DOWNLOAD_QR:
            return {
                ...state,
                errorMessage: ''
            };
        case TABLE_ERROR:
            return {
                ...state,
                errorMessage: action.payload
            };
        default:
            return state;
    }
};