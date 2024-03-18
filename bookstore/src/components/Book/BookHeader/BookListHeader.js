import React from "react";
import {Button, Typography} from "antd";
import './BookListHeader.css'

const {Title, Paragraph} = Typography;

export const BookListHeader = ({activeGenre, filterBooksByGenre}) => {
    return (
        <div>
            <Title level={2}>Welcome to Our Bookstore</Title>
            <Paragraph>
                Explore our wide selection of books. Find your next favorite read!
            </Paragraph>
            <div className="filter-section_line"/>
            <div className="filter-section">
                <div className="filterBtn">
                    <Button
                        style={{marginRight: "15px"}}
                        type={activeGenre === "Mystery" ? "primary" : "default"}
                        onClick={() => filterBooksByGenre("Mystery")}
                    >
                        Mystery
                    </Button>
                    <Button
                        style={{marginRight: "15px"}}
                        type={activeGenre === "Adventure" ? "primary" : "default"}
                        onClick={() => filterBooksByGenre("Adventure")}
                    >
                        Adventure
                    </Button>
                    <Button
                        style={{marginRight: "15px"}}
                        type={activeGenre === "Horror" ? "primary" : "default"}
                        onClick={() => filterBooksByGenre("Horror")}
                    >
                        Horror
                    </Button>
                    <Button
                        style={{marginRight: "15px"}}
                        type={activeGenre === "Fiction" ? "primary" : "default"}
                        onClick={() => filterBooksByGenre("Fiction")}
                    >
                        Fiction
                    </Button>
                    <Button
                        style={{marginRight: "15px"}}
                        type={activeGenre === "Romance" ? "primary" : "default"}
                        onClick={() => filterBooksByGenre("Romance")}
                    >
                        Romance
                    </Button>
                    <Button
                        type={activeGenre === "all" || activeGenre === null ? "primary" : "default"}
                        onClick={() => filterBooksByGenre("all")}
                    >
                        All
                    </Button>
                </div>
            </div>
            <div className="filter-section_line"/>
        </div>
    );
};