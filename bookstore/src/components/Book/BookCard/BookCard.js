import React, {useEffect, useState} from "react";
import {Button, Card, Image} from "antd";
import {StarOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {addBook, createNewOrder} from "../store/orderBook/orderThunk";
import {usersAPI} from "../../../API/server";
import {useNavigate} from "react-router-dom";

export const BookCard = ({book, favoriteBooks, toggleFavorite, openModal}) => {
    const dispatch = useDispatch()
    const [user, setUser] = useState([])
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        async function fetchData() {
            const res = await usersAPI.getList()
            setUser(res)
        }

        fetchData()
    }, []);


    const onBuyBntClick = () => {
        if (user.orders.length === 0) {
            dispatch(createNewOrder(book.id, 1))
            console.log("Create")
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                navigate('/basket')
            }, 2000)

        } else {
            dispatch(addBook(1, book.id, 1))
            console.log("Add")
        }
    }


    return (
        <Card
            loading={loading}
            hoverable
            style={{
                width: 260, height: 650, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            cover={<Image
                width={260}
                height={400}
                src={book.imageURL}
                style={{width: "100%"}}
                loading={"lazy"}
            />}
            actions={[<div
                style={{
                    display: "flex", justifyContent: "center", alignItems: "center", gap: "5px",
                }}
            >
                <Button type="primary" onClick={onBuyBntClick}>
                    Добавить в корзину
                </Button>
                <Button
                    type="text"
                    icon={<StarOutlined
                        style={{
                            color: favoriteBooks.some((item) => item.id === book.id) ? "#ffd700" : "#8c8c8c",
                        }}
                    />}
                    onClick={() => toggleFavorite(book)}
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
};