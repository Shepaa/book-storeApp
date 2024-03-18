import {useDispatch, useSelector} from "react-redux";
import {addBook, createNewOrder} from "../Book/store/orderBook/orderThunk";
import {Button, Card, Image} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import React from "react";
import {removeFromFavorites} from "./store/favoritesReducer";

export const FavoriteBookItem = ({book, openModal}) => {
    const dispatch = useDispatch()
    const orders = useSelector(state => state.orderReducer.orders);

    function handleRemoveFromFavorites(bookId) {
        dispatch(removeFromFavorites(bookId))
    }

    const onBuyBntClick = () => {
        if (!orders.length) {
            dispatch(createNewOrder(1, book.id, 1))
            console.log("Create")
        } else {
            dispatch(addBook(1, book.id, 1))
            console.log("Add")
        }
    }


    return (
        <Card
            hoverable
            style={{
                width: 260, height: 650, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            cover={<Image
                width={260}
                height={400}
                src={book.imageURL}
                style={{width: "100%"}}
            />}
            actions={[<div
                style={{
                    display: "flex", justifyContent: "center", alignItems: "center", gap: "5px",
                }}
            >
                <Button type="primary" onClick={onBuyBntClick}>
                    Добавить в корзину
                </Button>
                <CloseOutlined
                    style={{color: '#ff4d4f'}}
                    onClick={() => {
                        handleRemoveFromFavorites(book.id)
                    }}
                />
            </div>,]}
        >
            <div onClick={() => openModal(book)}>
                <div style={{height: "50px"}}>
             <span style={{fontWeight: 'bold', cursor: 'pointer'}}>
                {book.title}
             </span>
                </div>
                <div onClick={() => openModal(book)}>Цена: {book.price}$</div>
            </div>
        </Card>
    );
}