import {Avatar, Divider} from "antd";
import {QqOutlined } from '@ant-design/icons'

const Author = ()=>{
    return (
        <div className="author-div comm-box">
            <div>
                <Avatar size={50} src="https://media.st.dl.pinyuncloud.com/steamcommunity/public/images/avatars/44/445f1ca9fafd12e8711958e897d06e5e55b22f97.jpg" />
            </div>
            <div className="author-name">Wellbold</div>
            <div className="author-introduction">
                一枚前端菜鸟，WHU就读
                <Divider/>
                <Avatar size={28} icon=<QqOutlined /> className="account" />
            </div>
        </div>
    )
}

export default Author;