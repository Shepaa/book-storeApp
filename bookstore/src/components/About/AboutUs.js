import React from 'react';
import { Typography, Row, Col } from 'antd';
import './AboutUs.css';

const { Title, Paragraph } = Typography;

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <Title level={2} className="about-us-title">About Us</Title>
            <Row gutter={[16, 16]} justify="center">
                <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                    <div className="about-us-card">
                        <Title level={3} className="about-us-card-title">Our Mission</Title>
                        <Paragraph className="about-us-card-text">
                            We strive to provide the best selection of books and excellent customer service to book lovers around the world.
                        </Paragraph>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                    <div className="about-us-card">
                        <Title level={3} className="about-us-card-title">Our Team</Title>
                        <Paragraph className="about-us-card-text">
                            Meet our team of dedicated book enthusiasts who are passionate about literature and helping readers find their next favorite book.
                        </Paragraph>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                    <div className="about-us-card">
                        <Title level={3} className="about-us-card-title">Our Values</Title>
                        <Paragraph className="about-us-card-text">
                            We believe in fostering a love of reading, promoting diversity in literature, and supporting authors and publishers in their creative endeavors.
                        </Paragraph>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default AboutUs;
