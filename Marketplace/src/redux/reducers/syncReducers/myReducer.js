import { CHANGE_PAGE} from "../../actions/syncActions/myActions";

const default_state = {
    page: 0,
    extra_data: "Hello World!"
}

export const my_page = (state = default_state, action) => {
    switch (action.type) {
        case CHANGE_PAGE: {
            return {
                ...state, // Keep all state and olny modify counter
                page: parseInt(action.payload)
            }
        }
        default: return state;
    }
}