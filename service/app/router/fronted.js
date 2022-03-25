module.exports = app=>{
    const {router,controller} = app;
    router.get('/fronted/index',controller.fronted.home.index)
    router.get('/fronted/getArticleList',controller.fronted.home.getArticleList)
    router.get('/fronted/getArticleById/:id',controller.fronted.home.getArticleById)
    router.get('/fronted/getTypeInfo',controller.fronted.home.getTypeInfo)
    router.get('/fronted/getListById/:id',controller.fronted.home.getListById)
}