import React,{useState,useEffect} from'react';
import {marked} from 'marked';
import '../static/css/AddArticle.css';
import {Row,Col,Input,Select,Button,DatePicker,message} from 'antd';
import {Router, Route, Routes,Outlet} from "react-router-dom";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import servicePath from './apiUrl';
import {useParams} from 'react-router'



const {Option} = Select;
const {TextArea} = Input;



export default function AddArticle(props){

    const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('')   //文章标题
    const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate,setShowDate] = useState()   //发布日期
    const [updateDate,setUpdateDate] = useState() //修改日志的日期
    const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType,setSelectType] = useState(1) //选择的文章类别
    const navi=useNavigate();
    const params = useParams();






    marked.setOptions({
        renderer:new marked.Renderer(),
        gfm:true,
        pedantic:false,
        sanitize:false,
        tables:true,
        breaks:false,
        smartLists:true,
        smartypants:false

    })

     const changeContent = (e)=>{
        setArticleContent(e.target.value);
        let html = marked(e.target.value);
        setMarkdownContent(html);
     }

     const changeIntroduction=(e)=>{
        setIntroducemd(e.target.value);
        let html = marked(e.target.value);
        setIntroducehtml(html);
     }

     const getTypeInfo = ()=>{
        axios({
            method:'get',
            url:servicePath.getTypeInfo,
            withCredentials:true,
        }).then(
            res=>{
                if(res.data.data==='没有登录'){
                    navi('/');
                }
                else {
                    setTypeInfo(res.data.data);
                }
            }
        )
     }

    const saveArticle = ()=>{

        //markedContent()  //先进行转换
        if(!selectedType || selectedType=='博客首页'){
            message.error('必须选择文章类别')
            return false
        }else if(!articleTitle){
            message.error('文章名称不能为空')
            return false
        }else if(!articleContent){
            message.error('文章内容不能为空')
            return false
        }else if(!introducemd){
            message.error('简介不能为空')
            return false
        }else if(!showDate){
            message.error('发布日期不能为空')
            return false
        }

        let dataProps={}
        console.log(selectedType)
        dataProps.type_id = selectedType
        dataProps.title = articleTitle
        dataProps.content =articleContent
        dataProps.introduction =introducemd
        let datetext= showDate.replace('-','/') //把字符串转换成时间戳
        dataProps.timestamp =(new Date(datetext).getTime())/1000
        //dataProps.part_count = partCount
        //dataProps.article_content_html = markdownContent
        //dataProps.introduce_html = introducehtml

        if(articleId==0){
            console.log('articleId=:'+articleId)
            dataProps.view_count =Math.ceil(Math.random()*100)+1000
            axios({
                method:'post',
                url:servicePath.addArticle,
                data:dataProps,
                withCredentials: true
            }).then(
                res=>{
                    setArticleId(res.data.insertId)
                    if(res.data.isSuccess){
                        message.success('文章发布成功')
                    }else{
                        message.error('文章发布失败');
                    }

                }
            )
        }else{
            console.log('articleId:'+articleId)
            dataProps.id = articleId
            axios({
                method:'post',
                url:servicePath.updateArticle,

                data:dataProps,
                withCredentials: true
            }).then(
                res=>{

                    if(res.data.isSuccess){
                        message.success('文章保存成功')
                    }else{
                        message.error('保存失败');
                    }


                }
            )
        }


    }

    const getArticleById=(id)=>{

        axios(servicePath.getArticleById+id,{
            withCredentials:true
        }).then(
            res=>{
                //let articleInfo= res.data.data[0]
                setArticleTitle(res.data.data[0].title)
                setArticleContent(res.data.data[0].content)
                let html=marked(res.data.data[0].content)
                setMarkdownContent(html)
                setIntroducemd(res.data.data[0].introduction)
                let tmpInt = marked(res.data.data[0].introduction)
                setIntroducehtml(tmpInt)
                setShowDate(res.data.data[0].timestamp)
                setSelectType(res.data.data[0].type_id)
            }
        )

    }

    const selectTypeHandler =(value)=>{
        setSelectType(value)
    }


    useEffect(()=>{
        getTypeInfo()
        //获取文章ID
        let tmpId = params.id;
        if(params.id){
            setArticleId(params.id);
            console.log(servicePath.getArticleById+params.id);
            getArticleById(params.id);

        }


    },[])





    return(
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input placeholder="博客标题"
                                   value={articleTitle}
                                   size="large"
                                   onChange={e=>{setArticleTitle(e.target.value)}}
                            />
                        </Col>
                        <Col span={4}>
                            &nbsp;
                            <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
                                {
                                    typeInfo.map((item,index)=>{
                                        return(<Option key={index} value={item.Id}>{item.type_name}</Option>)
                                    })
                                }

                            </Select>
                        </Col>
                    </Row>
                    <br/>
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea className="markdown-content"
                                      rows={35}
                                      placeholder="文章内容"
                                      value={articleContent}
                                      onChange={changeContent}
                                      onPressEnter={changeContent}
                            />
                        </Col>
                        <Col span={12}>
                            <div className="show-html"
                                 dangerouslySetInnerHTML={{__html:markdownContent}}
                            >

                            </div>
                        </Col>

                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="large">暂存文章</Button>&nbsp;
                            <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                            <Col span={12}>
                                <div className="date-select">
                                    <DatePicker placeholder="发布日期"
                                                size="large"
                                                onChange={(date,dateString)=>{setShowDate(dateString)}}
                                    />
                                </div>
                            </Col>
                        </Col>

                        <Col span="24">
                            <br/>
                            <TextArea rows={4}
                                      placeholder="简介。。。"
                                      value={introducemd}
                                      onChange={changeIntroduction}
                                      onPressEnter={changeIntroduction}
                            >

                            </TextArea>
                            <br/><br/>
                            <div className="introduce-html" dangerouslySetInnerHTML={{__html:introducehtml}}></div>
                        </Col>

                    </Row>
                </Col>
            </Row>
        <Outlet />

        </div>
    )
}
