import React, { Component } from 'react';
import { Button, Table, Switch, Notification } from 'antd';
import { Link } from 'react-router-dom';

export class ArticleList extends React.Component {
	constructor () {
    super()
    this.state = {
      articles:[],
    }
    Notification.config({
			duration: 3,
    	placement: 'topLeft',
		})
  }

  componentWillMount () {
		this.fetchData()
	}

	fetchData () {
  	var that = this
		axios.get('/articles/list')
    .then(function (response) {
      that.setState({
      	articles: response.data
      })
    }).catch(function (error) { console.log(error); });
	}

	changePulic (id) {
		let that = this
		axios.post('/articles/changePublic', {
			id: id
		}).then(function (response) {
			let articles = that.state.articles
			let index = articles.findIndex(function (element) {
	  		return element.id == id;
			})
			articles[index].is_public = (articles[index].is_public + 1) % 2
			that.setState({
				articles: articles
			})
			Notification["success"]({
	    	message: '成功',
	    	description: response.data.description,
	  	})
    }).catch(function (error) { console.log(error); });
	}

	handleDelete (id) {
		let that = this
		axios.get('/articles/delete/'+id)
		.then(function (response) {
			let index = that.state.articles.findIndex(function (element) {
	  		return element.id == id;
			})
			let articles = []
			for (let i = 0; i < that.state.articles.length; i++) {
				if (i != index) {
					articles.push(that.state.articles[i])
				}
			}
			that.setState({
				articles: articles
			})
			Notification["success"]({
	    	message: '成功',
	    	description: response.data.description,
	  	})
    }).catch(function (error) { console.log(error); });
	}

	handleEdit () {
		console.log("want to handle edit")
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
	  		render: (text, record) => {
			    if (record.is_public) {
			    	return <Switch size="small" defaultChecked onChange={this.changePulic.bind(this, record.id)} />
			    } else {
			    	return <Switch size="small" onChange={this.changePulic.bind(this, record.id)} />
			    }
	  		}
	  	}, {
	  		title: '标题',
	  		dataIndex: 'title',
	  		key: 'title',
	  		width: '120px',
	  	}, {
	  		title: '用户ID',
	  		dataIndex: 'user_id',
	  		key: 'user_id',
	  	}, {
	  		title: '赞数',
	  		dataIndex: 'likes_count',
	  		key: 'likes_count',
	  	}, {
	  		title: '发布时间',
	  		dataIndex: 'created_at',
	  		key: 'created_at',
	  	}, {
	  		title: '操作',
	  		key: 'action',
	  		render: (text, record) => (
			    <span>
			    	<Button className="btn_default" type="danger" onClick={this.handleDelete.bind(this, record.id)}>删除</Button>
			    	<Button className="btn_default" onClick={this.handleEdit.bind(this)}>编辑</Button>
			    </span>
			  ),
	  	}
	  ];

		return (
			<div>
				<div className="btn_group">
					<Link to="/articles/create">
	          <Button className="btn_default" type="primary">创建新文章</Button>
	        </Link>
				</div>
				<div>
					<Table
	          dataSource = { this.state.articles }
	          rowKey = "id"
	          columns = { columns }
	          style = {{ padding: '40px 0' , background: "white"}}
	        />
				</div>
			</div>
		)
	}
}