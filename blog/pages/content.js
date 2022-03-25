import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";
import {Row,Col, Breadcrumb,Affix,Menu} from "antd";
import {Icon} from '@ant-design/compatible';
import Header from "../public/components/Header";
import Author from "../public/components/Author";
import Footer from "../public/components/Footer";
import Advertisement from "../public/components/Advertisement";
import ReactMarkdown from "react-markdown";
import {MarkdownNavbar} from "markdown-navbar";
import axios from 'axios'
import {marked} from 'marked'
import hljs from 'highlight.js'
import Tocify from '../public/components/tocify.tsx'
import servicePath from '../config/apiUrl'
import React , {useState,useEffect}from "react";


export default function Content(props) {




    const tocify = new Tocify();

    const renderer = new marked.Renderer();

    renderer.heading = function (text,level,raw){
        const anchor = tocify.add(text,level);
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h ${level}>${text}</h ${level}></a>\n`
    }

    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });


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
                    Content
                </title>
            </Head>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={15} xl={12}>
                    <div>
                        <div className="bread-div">
                            <Breadcrumb>
                                <Breadcrumb.Item><Link href="/">首页</Link></Breadcrumb.Item>
                                <Breadcrumb.Item overlay={menu}>
                                    <a href="">内容类型</a>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item >{props.title}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="detailed-title">
                            {props.title}
                        </div>
                        <div className="list-icon center">
                            <span><Icon type="calender" /> {props.timestamp}</span>
                            <span><Icon type="folder" />{props.type_name}</span>
                            <span><Icon type="fire" />{props.view_count}</span>
                        </div>
                        <div className="detailed-content"
                             dangerouslySetInnerHTML={{__html:marked(props.content)}}>
                        </div>
                    </div>
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={8} lg={8} xl={4}>
                    <Author/>
                    <Advertisement/>
                    <Affix offsetTop={5}>
                    <div className="detailed-nav comm-box">
                        <div className="nav-title">目录</div>
                        {tocify && tocify.render()}
                    </div>
                    </Affix>
                </Col>
            </Row>
            <Footer/>

        </div>
    )
}

Content.getInitialProps = async (context) =>{
    console.log(context.query.id)
    let id =context.query.id;
    const promise = new Promise((resolve)=>{

        axios(servicePath.getArticleById+id).then(
            (res)=>{

                resolve(res.data.data[0])
            }
        )
    })

    return await promise
}
