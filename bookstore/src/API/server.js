import {API} from "./API";
import {allBooks, forDeleteOrder, forDeleteOrderItem, forNewOrder, orders, usersURL} from "./URL";

export const allBooksAPI = new API(allBooks);

export const newOrderAPI = new API(forNewOrder)

export const ordersAPI = new API(orders)

export const usersAPI = new API(usersURL)

export const deleteOrderItemAPI = new API(forDeleteOrderItem)

export const deleteOrderAPI = new API(forDeleteOrder)

