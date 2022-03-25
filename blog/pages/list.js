import Head from 'next/head'
import React,{useState,useEffect} from "react";
import Link from "next/link";
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Row,Col,List,Breadcrumb,Menu} from "antd";
import {Icon} from '@ant-design/compatible';
import Header from "../public/components/Header";
import Author from "../public/components/Author";
import Advertisement from '../public/components/Advertisement';
import Footer from "../public/components/Footer";
import axios from 'axios';
import servicePath from '../config/apiUrl';
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';




export default function MyList(list) {

    const [mylist,setMylist] = useState(list.data)
    useEffect(()=>{
        setMylist(list.data)
    })

    const menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="/list?id=1">
                    技术学习
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="/list?id=2">
                    游戏生活
                </a>
            </Menu.Item>
        </Menu>
    );


    return (
        <div>
            <Head>
                <title>
                    Home
                </title>
            </Head>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={15} xl={12}>
                    <div className="bread-div">
                            <Breadcrumb>
                                <Breadcrumb.Item><Link href="/">首页</Link></Breadcrumb.Item>
                                <Breadcrumb.Item overlay={menu}>
                                    <a href="">内容类型</a>
                                </Breadcrumb.Item>

                            </Breadcrumb>
                    </div>

                    <List
                        header={<div>latest</div>}
                        itemLayout="vertical"
                        dataSource={mylist}
                        renderItem={item=>(
                            <List.Item>
                                <div className="list-title">
                                    <Link href={{pathname:'/content',query:{id:item.id}}}>
                                    <a>{item.title}</a>
                                </Link></div>
                                <div className="list-icon">
                                    <span><Icon type="calender" /> {item.timestamp}</span>
                                    <span><Icon type="folder" />{item.type_name}</span>
                                    <span><Icon type="fire" />{item.view_count}</span>
                                </div>
                                <div className="list-context">
                                    {item.introduction}
                                    </div>
                            </List.Item>
                        )}
                    />
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={8} lg={8} xl={4}>
                    <Author />
                    <Advertisement />
                </Col>
            </Row>
            <Footer/>

        </div>
    )
}



MyList.getInitialProps = async (context)=>{
    let id = context.query.id;
    const promise = new Promise((resolve)=>{
        axios(servicePath.getListById +id).then(
            (res)=>{
                resolve(res.data)
            }
        )
    })

    return await promise
}