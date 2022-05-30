export const CHANGE_PAGE = "CHANGE_PAGE"
export const ADD_TO_CART = "ADD_TO_CART"
export const REMOVE_TO_CART = "REMOVE_TO_CART"

export const change_page_action = (page) => {
    return {
        type: "CHANGE_PAGE",
        payload: page
    }
}

export const add_to_cart_action = (product) => {
    return {
        type: "ADD_TO_CART",
        payload: product
    }
}

export const remove_to_cart_action = (product) => {
    return {
        type: "REMOVE_TO_CART",
        payload: product
    }
}
