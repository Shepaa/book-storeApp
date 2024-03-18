import {BookCard} from "../BookCard/BookCard";
import {Col, Row, Skeleton} from "antd";
import {BookModal} from "../../BookInfo/BookInfo";
import {BookListHeader} from "../BookHeader/BookListHeader";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actionGetBookList} from "../store/book/bookThunk";
import {addToFavorites, removeFromFavorites} from "../../Favorite/store/favoritesReducer";

export function BooksList() {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.books.booksList);
    const listLoading = useSelector((state) => state.books.listLoading);
    const favoriteBooks = useSelector((state) => state.favoriteBooks.books);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [activeGenre, setActiveGenre] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

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

    const toggleFavorite = (book) => {
        if (favoriteBooks.some((item) => item.id === book.id)) {
            dispatch(removeFromFavorites(book.id));
        } else {
            dispatch(addToFavorites(book));
        }
    };

    const openModal = (book) => {
        setSelectedBook(book);
        setModalVisible(true);
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
                <Row gutter={[24, 24]} style={{marginTop: 40}}>
                    {!listLoading ? (
                        filteredBooks.map((data, index) => (
                            <Col key={index} xs={24} sm={12} md={8} lg={6}>
                                <BookCard
                                    book={data}
                                    favoriteBooks={favoriteBooks}
                                    toggleFavorite={toggleFavorite}
                                    openModal={openModal}
                                />
                            </Col>
                        ))
                    ) : (
                        <Skeleton/>
                    )}
                </Row>
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
}