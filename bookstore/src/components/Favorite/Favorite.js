import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Col, Row, Skeleton} from 'antd';
import './Favorite.css'
import {actionGetBookList} from "../Book/store/book/bookThunk";
import {BookListHeader} from "../Book/BookHeader/BookListHeader";
import {BookModal} from "../BookInfo/BookInfo";
import {FavoriteBookItem} from "./FavoriteBookItem";


export const FavoriteBooks = () => {
    const dispatch = useDispatch();
    const books = useSelector(state => state.favoriteBooks.books);
    const listLoading = useSelector((state) => state.books.listLoading);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [activeGenre, setActiveGenre] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const openModal = (book) => {
        setSelectedBook(book);
        setModalVisible(true);
    };

    const filterBooksByGenre = (genre) => {
        if (genre === "all") {
            setFilteredBooks(books);
            setActiveGenre(null);
        } else {
            const filtered = books.filter((book) => book.genre === genre);
            setFilteredBooks(filtered);
            setActiveGenre(genre);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        dispatch(actionGetBookList());
    }, [dispatch]);

    useEffect(() => {
        setFilteredBooks(books);
    }, [books]);

    return (
        <div>
            <BookListHeader
                activeGenre={activeGenre}
                filterBooksByGenre={filterBooksByGenre}
            />
            <div style={{marginLeft: "10%"}}>
                {filteredBooks.length === 0 ? (
                    <div>
                        <h2>No favorite books found</h2>
                        <p>Add some books to your favorites to see them here.</p>
                    </div>
                ) : (
                    <Row gutter={[24, 24]} style={{marginTop: 40}}>
                        {!listLoading ? (
                            filteredBooks.map((data, index) => (
                                <Col key={index} xs={24} sm={12} md={8} lg={6}>
                                    <FavoriteBookItem
                                        book={data}
                                        openModal={openModal}
                                    />
                                </Col>
                            ))
                        ) : (
                            <Skeleton/>
                        )}
                    </Row>
                )}
                {selectedBook && (
                    <BookModal
                        visible={modalVisible}
                        book={selectedBook}
                        onClose={closeModal}
                    />
                )}
            </div>
        </div>
    );
};


