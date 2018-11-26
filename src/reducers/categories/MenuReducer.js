import {
    MENU_ERROR,
    MENU_CREATE_CATEGORY,
    MENU_CREATE_ITEM,
    MENU_GET_CATEGORIES,
    MENU_GET_ITEMS,
    MENU_CURRENT_CATEGORY_ID,
    MENU_CLEAR,
    MENU_SHOW_NEW_CATEGORY_MODAL,
    MENU_SHOW_NEW_ITEM_MODAL,
    MENU_DELETE_ITEM, MENU_DELETE_CATEGORY
} from "../../actions/types";

const INITIAL_STATE = {
    numOfCategories: 0,
    menuCategories: [],
    currentCategoryId: 0,
    menuItems: [],
    newCategoryModalShown: false,
    newItemModalShown: false,
    errorMessage: ''
};

export default function(state=INITIAL_STATE, action) {
    switch(action.type){
        case MENU_CREATE_CATEGORY:
            return {
                ...state,
                currentCategoryId: action.payload.categoryId,
                errorMessage: ''
            };
        case MENU_CREATE_ITEM:
            return {
                ...state,
                errorMessage: ''
            };
        case MENU_GET_CATEGORIES:
            return {
                ...state,
                menuCategories: action.payload.menuCategories,
                numOfCategories: action.payload.menuCategories.length,
                // currentCategoryId -> if the fetched menuCategories has at least 1 item,
                // check if the previous currentCategoryId has not been deleted.
                // If it wasn't deleted, return the previous currentCategoryId.
                // If it was deleted, return the first id of the new list of menuCategories.
                // If the previous currentCategoryId was 0 meaning it was unselected,
                // then return the first id of the new list of menuCategories.
                // Else if the new list of menuCategories doesn't contain anything, return 0.
                currentCategoryId: action.payload.menuCategories.length > 0 ?
                    (state.currentCategoryId !== 0 ?
                        (action.payload.menuCategories.filter((category) =>
                            category.id === state.currentCategoryId).length !== 0 ?
                            state.currentCategoryId : action.payload.menuCategories[0].id) :
                        action.payload.menuCategories[0].id) : 0,
                errorMessage: ''
            };
        case MENU_GET_ITEMS:
            return {
                ...state,
                menuItems: action.payload.menuItems,
                errorMessage: ''
            };
        case MENU_CURRENT_CATEGORY_ID:
            return {
                ...state,
                currentCategoryId: action.payload,
                errorMessage: ''
            };
        case MENU_CLEAR:
            return INITIAL_STATE;
        case MENU_SHOW_NEW_CATEGORY_MODAL:
            return {
                ...state,
                newCategoryModalShown: action.payload
            };
        case MENU_SHOW_NEW_ITEM_MODAL:
            return {
                ...state,
                newItemModalShown: action.payload
            };
        case MENU_DELETE_CATEGORY:
            return {
                ...state,
                errorMessage: ''
            };
        case MENU_DELETE_ITEM:
            return {
                ...state,
                errorMessage: ''
            };
        case MENU_ERROR:
            return {
                ...state,
                errorMessage: action.payload
            };
        default:
            return state;
    }
};