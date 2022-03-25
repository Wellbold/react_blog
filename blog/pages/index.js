import Head from 'next/head'
import React,{useState,useEffect} from "react";
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Row,Col,List,BackTop,Calendar} from "antd";
import {Icon} from '@ant-design/compatible';
import Header from "../public/components/Header";
import Author from "../public/components/Author";
import Advertisement from '../public/components/Advertisement';
import Footer from "../public/components/Footer";
import axios from 'axios';
import Link from 'next/link'
import servicePath from '../config/apiUrl'
import {marked} from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'


const Home = (list)=> {

    const [mylist,setMylist] = useState(list.data)

    const renderer = new marked.Renderer();

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
    })

  return (
    <div>
      <Head>
        <title>
          Home
        </title>
      </Head>
      <Header />
        <div className="head-line"></div>
        <Row className="comm-main" type="flex" justify="center">
            <Col className="comm-left" xs={24} sm={24} md={16} lg={15} xl={12}>
                <List
                header={<div>最新内容</div>}
                itemLayout="vertical"
                dataSource={mylist}
                renderItem={item=>(
                    <List.Item>
                        <div className="list-title">
                            <Link href={{pathname:'/content',query:{id:item.id}}}>
                                <a>{item.title}</a>
                            </Link>
                        </div>
                        <div className="list-icon">
                            <span><Icon type="calendar" />{item.timestamp}</span>
                            <span><Icon type="folder" />{item.type_name}</span>
                            <span><Icon type="fire" />{item.view_count}</span>
                        </div>
                        <div className="list-context"
                             dangerouslySetInnerHTML={{__html:marked(item.introduction)}}>
                        </div>
                    </List.Item>
                )}
                />
            </Col>
            <Col className="comm-right" xs={0} sm={0} md={8} lg={8} xl={4}>
                <Author />
                <Advertisement />
                <Calendar fullscreen={false} onPanelChange={onPanelChange}/>
            </Col>
        </Row>
        <Footer/>
        <BackTop></BackTop>
    </div>
  )

}

function onPanelChange(value, mode) {
    console.log(value, mode);
}

Home.getInitialProps = async ()=>{
    const promise = new Promise((resolve)=>{
        axios(servicePath.getArticleList).then(
            (res)=>{

                resolve(res.data)
            }
        )
    })

    return await promise
}

export default Home;
