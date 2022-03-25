'use strict'

const Controller = require('egg').Controller

class MainController extends Controller{
    async index(){
        this.ctx.body="api testing"
    }

    async checkLogin(){
        let userName = this.ctx.request.body.userName;
        let password = this.ctx.request.body.password;
        const sql = " SELECT userName FROM admin_user WHERE userName = '"+userName +
            "' AND password = '"+password+"'";

        const res = await this.app.mysql.query(sql);
        if(res.length>0){

            let openId=new Date().getTime();
            this.ctx.session.openId={ 'openId':openId }
            this.ctx.body={'data':'登录成功','openId':openId}

        }
        else { this.ctx.body={'data': '登陆失败'}}
    }

    async getTypeInfo(){
        const resType = await this.app.mysql.select('article_type');
        this.ctx.body={'data':resType};
    }

    async addArticle(){

        let tempArticle = this.ctx.request.body
        const result = await this.app.mysql.insert('article',tempArticle)

        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId
        this.ctx.body={
            isSuccess:insertSuccess,
            insertId:insertId,

        }

    }

    async updateArticle(){
        let tempArticle = this.ctx.request.body;
        const result = await this.app.mysql.update('article',tempArticle);
        const updateSuccess = result.affectedRows ===1;
        console.log(updateSuccess);
        this.ctx.body={
            isSuccess: updateSuccess
        }
    }

    async getArticleList(){
        let sql = 'SELECT article.id as id ,' +
            'article.title as title ,' +
            'article.introduction as introduction ,' +
            "FROM_UNIXTIME(article.timestamp,'%Y-%m-%d %H:%i:%s' ) as timestamp,"+
            'article.view_count as view_count ,' +
            'article.content as content, '+
            'article_type.type_name as type_name ' +
            'FROM article LEFT JOIN article_type ON article.type_id = article_type.Id '+
            'ORDER BY article.Id desc';

        const resList = await this.app.mysql.query(sql);
        this.ctx.body={list:resList};
    }

    async delArticle(){
        let id = this.ctx.params.id;
        const res = await this.app.mysql.delete('article',{'id':id})
        this.ctx.body={data:res}

    }

    async getArticleById(){
        let id = this.ctx.params.id;
        let sql = 'SELECT article.id as id ,' +
            'article.title as title ,' +
            'article.introduction as introduction ,' +
            "FROM_UNIXTIME(article.timestamp,'%Y-%m-%d' ) as timestamp,"+
            'article.view_count as view_count ,' +
            'article.content as content, '+
            'article_type.type_name as type_name ,' +
            'type_id as typeId '+
            'FROM article LEFT JOIN article_type ON article.type_id = article_type.Id '+
            'WHERE article.id ='+id;

        const result = await this.app.mysql.query(sql);
        this.ctx.body={data:result};

    }

}

module.exports = MainController;