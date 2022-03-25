import React,{useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import '../static/css/AdminIndex.css';
import {Router, Route, Routes,Outlet,useNavigate} from "react-router-dom";
import AddArticle from '../Pages/AddArticle';
import ArticleList from './ArticleList';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function AdminIndex(props){
    const [collapsed,setCollapsed] = useState(false);
    const navi = useNavigate();//导航

    const onCollapse = collapsed =>{
        setCollapsed(collapsed);
    };

    const handleClickArticle = (e) =>{
        console.log(e.item.props);
        if (e.key=='addArticle'){
            navi('/index/add');
        }
        else{
            navi('/index/list');
        }
    }


        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                            工作台
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined />}>
                            添加文章
                        </Menu.Item>
                        <SubMenu key="sub1" onClick={handleClickArticle} icon={<UserOutlined />} title="文章管理">
                            <Menu.Item key="addArticle">添加文章</Menu.Item>
                            <Menu.Item key="articleList">文章列表</Menu.Item>

                        </SubMenu>
                        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                            <Menu.Item key="6">留言管理</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9" icon={<FileOutlined />}>
                            Files
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                            <Breadcrumb.Item>工作台</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <div>

                                <Routes>
                                    <Route path="/" exact element={<AddArticle/>}/>
                                    <Route path="/add/" element={<AddArticle/>}/>
                                    <Route path="/add/:id" element={<AddArticle/>}/>
                                    <Route path="/list/" element={<ArticleList/>}/>
                                </Routes>

                            </div>

                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Wellbold blog for personal use</Footer>
                </Layout>
            </Layout>
        );
    }
