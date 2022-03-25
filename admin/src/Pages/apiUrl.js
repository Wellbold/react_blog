let ipUrl = 'http://localhost:7001/admin/'

let servicePath = {
    checkLogin : ipUrl +'checkLogin', //检查用户名 密码
    getTypeInfo : ipUrl +'getTypeInfo', //获得文章类别信息
    addArticle : ipUrl +'addArticle', //添加文章
    updateArticle:ipUrl + 'updateArticle' ,  //  修改文章第api地址
    getArticleList:ipUrl + 'getArticleList', //文章列表
    delArticle:ipUrl+'delArticle/', //删除文章
    getArticleById:ipUrl+'getArticleById/' //获得文章详细 BY ID
}

export default servicePath;