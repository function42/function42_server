import React, { Component } from 'react';
import { Button, Table } from 'antd';
import { Link } from 'react-router-dom';

export class ArticleList extends React.Component {
	constructor () {
    super();
    this.state = {
      articles:[],
    };
  }

  articleCreate () {

  }

	render () {
	  const columns = [
	  	{
	  		title: '序号',
	  		dataIndex: 'id',
	  		key: 'id',
	  	}, {
	  		title: '公开',
	  		dataIndex: 'is_public',
	  		key: 'is_public',
	  	}, {
	  		title: '标题',
	  		dataIndex: 'title',
	  		key: 'title',
	  	}, {
	  		title: '用户',
	  		dataIndex: 'user_id',
	  		key: 'user_id',
	  	}, {
	  		title: '点赞数',
	  		dataIndex: 'likes_count',
	  		key: 'likes_count',
	  	}, {
	  		title: '发布时间',
	  		dataIndex: 'created_at',
	  		key: 'created_at',
	  	}, {
	  		title: '修改时间',
	  		dataIndex: 'update_at',
	  		key: 'update_at',
	  	}, {
	  		title: '操作',
	  		key: 'action',
	  	}
	  ];

		return (
			<div>
				<Link to="/articles/create">
          <Button className="btn_header" type="primary">创建新文章</Button>
        </Link>
				<Table
          dataSource={ this.state.packages }
          columns={ columns }
          style={{ padding: '40px 0' }}
        />
			</div>
		)
	}
}