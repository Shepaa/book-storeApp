import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    Button,
    Input,
    Result,
    Typography,
    Space,
    Divider,
    Tooltip,
    Card,
} from "antd";
import {
    DollarOutlined,
    ReloadOutlined,
    InfoCircleOutlined,
    ArrowLeftOutlined,
    QuestionCircleOutlined,
} from "@ant-design/icons";
import {setBalance} from "./store/balanceReducer";
import "./Balance.css";
import {Link, useNavigate} from "react-router-dom";

const {Title, Text} = Typography;

export const Balance = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const balance = useSelector((state) => state.balanceReducer.balance);
    const [amount, setAmount] = useState("");
    const [done, setDone] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleTopUp = () => {
        const parsedAmount = parseFloat(amount);
        if (!isNaN(parsedAmount) && parsedAmount > 0) {
            dispatch(setBalance(balance + parsedAmount));
            setAmount("");
            toggleLoading();
            setTimeout(() => {
                toggleDone();
            }, 2000);
        }
    };

    const toggleDone = () => {
        setDone(true);
        toggleLoading();
    };

    const toggleLoading = () => {
        setLoading(!loading);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="balance_wrapper">
            <Card
                style={{
                    width: "500px",
                    borderRadius: "12px",
                    boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
                }}
                title={
                    <Space>
                        <DollarOutlined
                            style={{fontSize: "24px", animation: "pulse 2s infinite"}}
                        />
                        <Title level={3} style={{marginBottom: 30}}>
                            Пополнить баланс
                        </Title>
                    </Space>
                }
                extra={
                    <Tooltip title="Если у вас возникли вопросы, обратитесь к нашему FAQ">
                        <InfoCircleOutlined style={{fontSize: "18px"}}/>
                    </Tooltip>
                }
            >
                {!done ? (
                    <>
                        <Space
                            direction="vertical"
                            size="large"
                            style={{width: "100%", padding: "16px"}}
                        >
                            <Text strong>Текущий баланс:</Text>
                            <Text
                                style={{
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                    color: "#1890ff",
                                    animation: "bounce 1s",
                                }}
                            >
                                {balance.toFixed(2)}$
                            </Text>
                            <Divider/>
                            <Space>
                                <Input
                                    type="text"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Введите сумму пополнения"
                                    style={{
                                        width: 200,
                                        borderRadius: "8px",
                                        backgroundColor: "#f5f5f5",
                                    }}
                                    prefix={<DollarOutlined/>}
                                />
                                <Button
                                    type="primary"
                                    onClick={handleTopUp}
                                    loading={loading}
                                    icon={<ReloadOutlined spin={loading}/>}
                                    style={{borderRadius: "8px"}}
                                >
                                    Пополнить
                                </Button>
                            </Space>
                            <Button
                                type="default"
                                onClick={handleGoBack}
                                icon={<ArrowLeftOutlined/>}
                                style={{borderRadius: "8px"}}
                            >
                                Вернуться назад
                            </Button>
                        </Space>
                        <Divider/>
                        <Space
                            direction="vertical"
                            size="small"
                            style={{padding: "16px"}}
                        >
                            <Title level={5}>
                                <QuestionCircleOutlined/> Советы и FAQ
                            </Title>
                            <Text>
                                - Пополняйте баланс безопасно с помощью защищенных методов
                                оплаты.
                            </Text>
                            <Text>
                                - При возникновении вопросов обратитесь в нашу службу
                                поддержки.
                            </Text>
                        </Space>
                    </>
                ) : (
                    <Result
                        status="success"
                        title="Баланс успешно пополнен!"
                        subTitle={`Ваш текущий баланс: ${balance.toFixed(2)}$`}
                        extra={[
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Link to={"/"}>
                                    <Button type="primary" style={{width: "200px"}}>
                                        Вернуться к покупкам
                                    </Button>
                                </Link>
                                ,
                                <Button
                                    type="primary"
                                    style={{width: "200px"}}
                                    onClick={() => {
                                        window.location.reload();
                                    }}
                                >
                                    Пополнить ещё
                                </Button>
                            </div>,
                        ]}
                    />
                )}
            </Card>
        </div>
    );
};