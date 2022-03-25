'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {

    const{ ctx } = this;


    this.ctx.body = 'api hi';
  }

  async getArticleList(){

    let sql = 'SELECT article.id as id ,' +
        'article.title as title ,' +
        'article.introduction as introduction ,' +
        "FROM_UNIXTIME(article.timestamp,'%Y-%m-%d %H:%i:%s' ) as timestamp,"+
        'article.view_count as view_count ,' +
        'article.content as content, '+
        'article_type.type_name as type_name ' +
        'FROM article LEFT JOIN article_type ON article.type_id = article_type.Id';

    const results = await this.app.mysql.query(sql)
    this.ctx.body = {data:results};

  }

  async getArticleById(){
    let id = this.ctx.params.id;

    let sql = 'SELECT article.id as id ,' +
        'article.title as title ,' +
        'article.introduction as introduction ,' +
        "FROM_UNIXTIME(article.timestamp,'%Y-%m-%d %H:%i:%s' ) as timestamp,"+
        'article.content as content, '+
        'article.view_count as view_count ,' +
        'article_type.type_name as type_name ' +
        'FROM article LEFT JOIN article_type ON article.type_id = article_type.Id '+
        'WHERE article.Id='+id

    const result = await this.app.mysql.query(sql);

    this.ctx.body={data:result};

  }

  async getTypeInfo(){

    const result = await this.app.mysql.select('article_type')
    this.ctx.body = {data:result}
  }

  //根据类别ID获得文章列表
  async getListById(){
    let id = this.ctx.params.id;
    let sql = 'SELECT article.id as id ,' +
        'article.title as title ,' +
        'article.introduction as introduction ,' +
        "FROM_UNIXTIME(article.timestamp,'%Y-%m-%d %H:%i:%s' ) as timestamp,"+
        'article.content as content, '+
        'article.view_count as view_count ,' +
        'article_type.type_name as type_name ' +
        'FROM article LEFT JOIN article_type ON article.type_id = article_type.Id '+
        'WHERE type_id='+id

    const result = await this.app.mysql.query(sql);

    this.ctx.body={data:result};

  }

}

module.exports = HomeController;
