import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {usersAPI} from "../../API/server";
import "./Basket.css"
import {actionGetBookList} from "../Book/store/book/bookThunk";
import {Button, Image} from "antd";
import {removeBook, removeOrder} from "../Book/store/orderBook/orderThunk";

export const Basket = () => {
    const dispatch = useDispatch();
    const [orderedBooks, setOrderedBooks] = useState([])
    const books = useSelector((state) => state.books.booksList);
    const bookIdsInOrders = orderedBooks.map(order => order.bookId);
    const filteredBooks = books.filter(book => bookIdsInOrders.includes(book.id));
    const prices = filteredBooks.map(book => book.price)
    const totalPriceSum = prices.reduce((acc, currentValue) => acc + currentValue, 0);
    const [user, setUser] = useState([])
    const formattedTotalPrice = new Intl.NumberFormat("ru", {
        style: 'currency', currency: 'USD'
    }).format(totalPriceSum)


    useEffect(() => {
        dispatch(actionGetBookList());

        async function fetchData() {
            const res = await usersAPI.getList()
            setUser(res.orders)
            setOrderedBooks(res.orders[0].orderItemDTOs)
        }

        fetchData()
    }, [dispatch]);


    const handleRemoveBookBtn = async (bookId) => {
        try {
            dispatch(removeBook(bookId))
            setOrderedBooks(orderedBooks.filter(order => order.id !== bookId));
        } catch (error) {

        }
    }

    const handleRemoveOrder = async (orderId) => {
        try {
            dispatch(removeOrder(orderId))
        } catch (error) {

        }
    }
    return (
        <div className="basket-wrapper">
            {filteredBooks.length > 0 ? (
                <div>
                    <div className="basket-cards">
                        {filteredBooks.map((book, index) => (
                            <div key={index} className="card">
                                <div className="card-photo">
                                    <Image
                                        width={260}
                                        height={360}
                                        src={book.imageURL}
                                    />
                                </div>
                                <div className="card-details">
                                    <h3>{book.title}</h3>
                                    <p>Цена: {new Intl.NumberFormat("ru", {
                                        style: 'currency', currency: 'USD'
                                    }).format(book.price)}</p>
                                    <Button type="danger" onClick={() => handleRemoveBookBtn(book.id)}>Удалить из
                                        корзины</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="basket-total">
                        <h2>Общая сумма: {formattedTotalPrice}</h2>
                        <Button type="primary" onClick={() => handleRemoveOrder(user.id)}>Оплатить</Button>
                    </div>
                </div>
            ) : (
                <div>Корзина пуста</div>
            )}
        </div>
    );
}