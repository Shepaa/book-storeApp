import {ordersAPI, newOrderAPI, deleteOrderItemAPI, deleteOrderAPI} from "../../../../API/server";
import {
    getOrdersLoading,
    getOrdersSuccess,
    getOrdersError,
    createOrder,
    addBookToOrder,
    removeBookFromOrder,
} from "./orderReducer";

export const fetchOrders = () => {
    return async (dispatch) => {
        try {
            dispatch(getOrdersLoading());
            const orders = await ordersAPI.getList();
            dispatch(getOrdersSuccess(orders));
        } catch (error) {
            dispatch(getOrdersError(error.message));
        }
    };
};

export const createNewOrder = (bookId, quantity) => {
    return async (dispatch) => {
        try {
            const newOrder = await newOrderAPI.create({bookId, quantity});
            dispatch(createOrder(newOrder));
            console.log("create successful")
        } catch (error) {
            dispatch(getOrdersError(error.message));
        }
    };
};


export const addBook = (orderId, bookId, quantity) => {
    return async (dispatch) => {
        try {
            const response = await ordersAPI.create({orderId, bookId, quantity});
            dispatch(addBookToOrder(response));
            console.log("add successful")
        } catch (error) {
            dispatch(getOrdersError(error.message));
        }
    };
};

export const removeBook = (bookId) => {
    return async (dispatch) => {
        try {
            await deleteOrderItemAPI.delete(`${bookId}`);
            dispatch(removeBookFromOrder({bookId}));
        } catch (error) {
            dispatch(getOrdersError(error.message));
        }
    };
};

export const removeOrder = (orderId) => {
    return async (dispatch) => {
        try {
            await deleteOrderAPI.delete(orderId);
        } catch (error) {
            dispatch(getOrdersError(error.message));
        }
    }
}