import {Button, Modal, Image, Typography} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const {Title, Paragraph} = Typography;

export const BookModal = ({visible, book, onClose}) => {
    return (
        <Modal
            title={
                <div style={{display: "flex", alignItems: "center"}}>
                    <Title level={3} style={{marginLeft: "19%"}}><strong>Book Title:</strong> {book.title}</Title>
                </div>
            }
            open={visible}
            onCancel={onClose}
            footer={null}
            width={600}
            centered
        >
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <div style={{marginBottom: "24px"}}>
                    <Paragraph>
                        <strong>Genre:</strong> {book.genre}
                    </Paragraph>
                    <Paragraph>
                        <strong>Price:</strong> {book.price}$
                    </Paragraph>
                </div>
                <Paragraph style={{textAlign: "center"}}>{book.description}</Paragraph>
                <Button
                    type="primary"
                    icon={<SearchOutlined/>}
                    href={`https://google.com/search?q=${encodeURIComponent(book.title)}`}
                    target="_blank"
                    style={{marginTop: "24px"}}
                >
                    Search on Google
                </Button>
            </div>
        </Modal>
    );
};