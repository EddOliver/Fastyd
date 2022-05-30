import { ADD_TO_CART,REMOVE_TO_CART } from "../../actions/syncActions/myActions";

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

const default_state = {
    cart: [],
    price:0,
    extra_data: "Hello World!"
}

export const my_cart = (state = default_state, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            let temp = state.cart
            temp.push(action.payload)
            return {
                ...state, // Keep all state and olny modify counter
                cart: temp,
                price: parseFloat(action.payload.price) + state.price
            }
        }
        case REMOVE_TO_CART: {
            let temp = state.cart
            temp = removeItemOnce(temp,action.payload)
            return {
                ...state, // Keep all state and olny modify counter
                cart: temp,
                price: state.price - parseFloat(action.payload.price)
            }
        }
        default: return state;
    }
}