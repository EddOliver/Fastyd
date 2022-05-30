import Axios from "axios"

export const SEARCH_REQUEST = 'SEARCH_REQUEST'
export const SEARCH_REQUEST_SUCCESS = 'SEARCH_REQUEST_SUCCESS'
export const SEARCH_REQUEST_ERROR = 'SEARCH_REQUEST_ERROR'

// Actions

export const search_Request = () => {
    return {
        type: SEARCH_REQUEST
    }
}

export const search_Request_Success = (result) => {
    return {
        type: SEARCH_REQUEST_SUCCESS,
        payload: result
    }
}

export const search_Request_Error = (error) => {
    return {
        type: SEARCH_REQUEST_ERROR,
        payload: error
    }
}

const search_action = (value) => {
    return (dispatch) => {
        dispatch(search_Request());
        Axios.get(`https://b95b7f02.us-south.apigw.appdomain.cloud/coffeechain/getDB-label`, {
            headers: {
                'Accept': 'application/json',
                'X-IBM-Client-Id': '8509db14-5aef-4573-9b43-d6cc96766831',
                'label': value
            }
        }) //${value} if you want insert value into URL 
            .then(response => {
                dispatch(search_Request_Success(response.data.data));
            })
            .catch(error => {
                dispatch(search_Request_Error(error))
            })
    }
}

export default search_action;