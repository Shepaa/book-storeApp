import React, {useEffect, useState} from 'react';
import {Badge, Button, Layout, Menu} from 'antd';
import {Link, NavLink, Outlet} from "react-router-dom";
import {
    BookOutlined,
    GithubOutlined,
    HomeOutlined,
    InstagramOutlined,
    LinkedinOutlined,
    MailOutlined,
    PhoneOutlined,
    PlusCircleOutlined,
    ShoppingOutlined,
    ShoppingTwoTone,
    StarOutlined,
} from "@ant-design/icons";
import {Header} from "antd/es/layout/layout";
import './Layout.css'
import {useDispatch, useSelector} from "react-redux";
import {actionGetBookList} from "../Book/store/book/bookThunk";
import {usersAPI} from "../../API/server";

const {Content, Footer, Sider} = Layout;
const navigationLinks = [
    {key: '1', icon: <BookOutlined/>, label: 'Books', link: '/'},
    {key: '2', icon: <StarOutlined/>, label: 'Favorite', link: '/favorite'},
    {key: '3', icon: <ShoppingOutlined/>, label: 'basket', link: '/basket'},
    {key: '4', icon: <HomeOutlined/>, label: 'about', link: '/about'},
];

const CustomLayout = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const balance = useSelector((state) => state.balanceReducer.balance || 0.00);
    const [orderedBooks, setOrderedBooks] = useState([])


    useEffect(() => {
        dispatch(actionGetBookList());
    }, []);

    useEffect(() => {
        async function fetchData() {
            const res = await usersAPI.getList()
            setOrderedBooks(res.orders[0].orderItemDTOs)
        }

        fetchData()
    }, []);


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubscribe = () => {
        console.log(`Подписка на рассылку для ${email}`);
        setEmail('');
    };

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                }}

            >
                <div style={{marginTop: "40vh"}}>
                    <Menu theme="dark" mode="inline" selectedKeys={[]}>
                        {navigationLinks.map(item => (
                            <Menu.Item key={item.key} icon={item.icon}>
                                <NavLink className={"active"} to={item.link}>{item.label}</NavLink>
                            </Menu.Item>
                        ))}

                    </Menu>
                </div>
            </Sider>
            <Layout className="site-layout" style={{marginLeft: 200}}>
                <Header className='header'>
                    <div className="header_title">
                        Book Store
                    </div>
                    <div className="header_balance">
                        <Link to={"/balance"}>
                            <PlusCircleOutlined style={{marginRight: 5}}/>
                        </Link>
                        {balance}$
                    </div>
                    <Link to='/basket'>
                        <div className='shopBasket_wrapper'>
                            <Badge style={{backgroundColor: "#08c"}} count={orderedBooks.length}>
                                <ShoppingTwoTone className='shopBasket_icon'/>
                            </Badge>
                        </div>
                    </Link>
                </Header>
                <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                    <div
                        className="site-layout-background"
                        style={{padding: 24, textAlign: 'center'}}
                    >
                        <Outlet/>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center', backgroundColor: '#f0f0f0', padding: '24px'}}>
                    <div
                        style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px'}}>
                        <BookOutlined style={{fontSize: '24px', color: '#08c'}}/>
                        <span style={{fontSize: '18px', fontWeight: 'bold', marginLeft: '8px'}}>BookStore</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', marginBottom: '16px'}}>
                        <div style={{marginRight: '24px'}}>
                            <p style={{fontWeight: 'bold'}}>Контакты</p>
                            <p><MailOutlined style={{marginRight: '8px'}}/>contact@bookstore.com</p>
                            <p><PhoneOutlined style={{marginRight: '8px'}}/>+1 234 567 890</p>
                        </div>
                        <div>
                            <p style={{fontWeight: 'bold'}}>Адрес</p>
                            <p>123 Main Street</p>
                            <p>Booktown, CA 12345</p>
                        </div>
                    </div>
                    <div style={{marginBottom: '16px'}}>
                        <p style={{fontWeight: 'bold'}}>Следите за нами</p>
                        <Link to="https://github.com/Shepaa" target="_blank" rel="noopener noreferrer"
                              style={{marginRight: '8px'}}>
                            <GithubOutlined style={{fontSize: '24px'}}/>
                        </Link>
                        <Link to="https://www.linkedin.com/in/ivan-shepelev-4225a8298/" target="_blank"
                              rel="noopener noreferrer" style={{marginRight: '8px'}}>
                            <LinkedinOutlined style={{fontSize: '24px'}}/>
                        </Link>
                        <Link to={'https://www.instagram.com/vano_shepelev/'}>
                            <InstagramOutlined style={{fontSize: '24px', marginRight: '8px'}}/>
                        </Link>
                    </div>
                    <div>
                        <p>Подпишитесь на нашу рассылку, чтобы получать новости и специальные предложения!</p>
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Введите ваш email"
                            style={{padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginRight: '8px'}}
                        />
                        <Button onClick={handleSubscribe} type="primary" style={{borderRadius: '4px'}}>
                            Подписаться
                        </Button>
                    </div>
                    <div style={{marginTop: '16px'}}>
                        &copy; {new Date().getFullYear()} BookStore. Все права защищены.
                    </div>
                </Footer>
            </Layout>
        </Layout>
    );
};

export default CustomLayout;