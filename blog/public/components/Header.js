import React , {useState,useEffect}from "react";
//import '/react_blog/blog/styles/static/components/header.css'
import {Row,Col,Menu} from 'antd';
import {Icon} from '@ant-design/compatible';
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '/react_blog/blog/config/apiUrl'
import {useNavigate} from 'react-router-dom';


const Header = () => {



    const [navArray , setNavArray] = useState([]);
    useEffect(()=>{
        const fetchData = async ()=>{
            const result= await axios(servicePath.getTypeInfo).then(
                (res)=>{
                    setNavArray(res.data.data)
                    return res.data.data
                }
            )
            setNavArray(result)
        }
        fetchData();
    },[])

    const handleClick = (e)=>{
                if(e.key===0){
                    Router.replace('/');
                }
                else{
                    Router.push('/list?id='+e.key);
                }
    }

    return(
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={10} xl={12}>
                    <span className="header-logo">Wellbold</span>
                    <span className="header-txt">Website for personal use</span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={14} xl={5}>
                    <Menu
                        mode="horizontal"
                        onClick={handleClick}
                    >
                        {
                            navArray.map((item)=>{
                                return(
                                    <Menu.Item key={item.Id}>
                                        {item.type_name}
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header;