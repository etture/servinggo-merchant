import axios from 'axios';
import {
    TABLE_ERROR,
    TABLE_SHOW_TABLE_MODAL,
    TABLE_ADD,
    TABLE_REMOVE,
    TABLE_GET_TABLES,
    TABLE_CLEAR,
    TABLE_DOWNLOAD_QR
} from "../types";

import {api, action, checkAccessToken} from "../utils";

export const getTables = (token, reqBody, callback) => dispatch => {
    const TAG = 'getTables';
    checkAccessToken(token, async () => {
        try {
            const {accessToken} = token;

            // Configure header to contain accessToken
            const headerConfig = {headers: {authorization: accessToken}};
            const response = await axios.post(`${api}/api/merchant/table/getTables`, reqBody, headerConfig);

            dispatch(action(TABLE_GET_TABLES, response.data.tables));
            if (callback) callback(TAG);
        } catch (error) {
            dispatch(action(TABLE_ERROR, `${TAG} failed`));
        }
    });
};

export const addTable = (token, reqBody, callback) => dispatch => {
    const TAG = 'addTable';
    checkAccessToken(token, async () => {
        try {
            const {accessToken} = token;

            // Configure header to contain accessToken
            const headerConfig = {headers: {authorization: accessToken}};
            await axios.post(`${api}/api/merchant/table/addTable`, reqBody, headerConfig);

            dispatch(action(TABLE_ADD, ''));

            if (callback) callback(TAG);
        } catch (error) {
            dispatch(action(TABLE_ERROR, `${TAG} failed`));
        }
    });
};

export const removeTable = (token, reqBody, callback) => dispatch => {
    const TAG = 'removeTable';
    checkAccessToken(token, async () => {
        try {
            const {accessToken} = token;

            // Configure header to contain accessToken
            const deleteParams = {
                data: reqBody,
                headers: {authorization: accessToken}
            };
            await axios.delete(`${api}/api/merchant/table/removeTable`, deleteParams);

            dispatch(action(TABLE_REMOVE, ''));
            if (callback) callback(TAG);

        } catch (error) {
            dispatch(action(TABLE_ERROR, `${TAG} failed`));
        }
    });
};

export const showTableModal = (isShown, tableNum) => dispatch => {
    dispatch(action(TABLE_SHOW_TABLE_MODAL, {isShown, tableNum}));
};

export const clearTable = () => dispatch => {
    dispatch(action(TABLE_CLEAR, ''));
};

export const downloadQR = (token, reqBody, callback) => dispatch => {
    const TAG = 'downloadQR';
    checkAccessToken(token, async () => {
        try {
            const {accessToken} = token;

            // Configure header to contain accessToken
            const headerConfig = {headers: {authorization: accessToken}};
            await axios.post(`${api}/api/merchant/table/downloadQR`, reqBody, headerConfig);

            dispatch(action(TABLE_DOWNLOAD_QR, ''));
            if (callback) callback(TAG);

        } catch (error) {
            dispatch(action(TABLE_ERROR, `${TAG} failed`));
        }
    });
};

// export const downloadQR = (token, qr_url, callback) => dispatch => {
//     const TAG = 'downloadQR';
//     checkAccessToken(token, async () => {
//         try {
//             const {accessToken} = token;
//
//             // Configure header to contain accessToken
//             const headerConfig = {headers: {authorization: accessToken}};
//             await axios.post(`${api}/api/merchant/table/downloadQR`, headerConfig);
//
//             dispatch(action(TABLE_DOWNLOAD_QR, ''));
//             if (callback) callback(TAG);
//
//         } catch (error) {
//             dispatch(action(TABLE_ERROR, `${TAG} failed`));
//         }
//     });
// };