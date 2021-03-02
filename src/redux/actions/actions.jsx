import axiosWithAuth from '../axiosWithAuth';

export const actions = {
    FETCHING_START: 'FETCHING_START',
    FETCHING_SUCCESS: 'FETCHING_SUCCESS',
    FETCHING_FAIL: 'FETCHING_FAIL',
    ADD_LISTING: 'ADD_LISTING',
    UPDATE_LISTING: 'UPDATE_LISTING',
    DELETE_LISTING: 'DELETE_LISTING',
    LOGIN_START: 'LOGIN_START',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAIL: 'LOGIN_FAIL'
}

export const fetchStart = (dispatch) => {
    dispatch({type: FETCHING_START})
    axiosWithAuth()
        .get('')
        .then(res => {
            dispatch({type: FETCHING_SUCCESS, payload: res.data})
        })
        .catch(error => dispatch({type: FETCHING_FAIL, payload: error}))
}

export const addItem = (dispatch) => {
    return axiosWithAuth()
        .post('')
        .then(result => {
            dispatch({type: ADD_LISTING, payload: result.data})
        })
        .catch(error => dispatch({type: FETCHING_FAIL, payload: error}))
}

export const updateItem = (dispatch) => {
    return axiosWithAuth()
    .put('')
    .then(result => {
        dispatch({type: UPDATE_LISTING, payload: result.data})
    })
    .catch(error => dispatch({type: FETCHING_FAIL, payload: error}))
}

export const deleteItem = (dispatch) => {
    return axiosWithAuth()
    .delete('')
    .then(result => {
        dispatch({type: DELETE_LISTING, payload: result.data})
    })
    .catch(error => dispatch({type: FETCHING_FAIL, payload: error}))
}