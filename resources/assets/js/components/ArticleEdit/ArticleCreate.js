import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

export class ArticleCreate extends React.Component {
	constructor () {
		super();
		this.state = {
			title: "",
			content: "",
			is_public: 1,
		};
	}

	componentWillMount () {
		this.fetchData()
	}

	fetchData () {
		var that = this
	}

	render () {
		return (
			<div>
				<Link to="/articles">
	        <Button className="btn_header">返回</Button>
	      </Link>
				<Button className="btn_header" type="primary">保存</Button>
				<p>接下来是编辑框</p>
			</div>
		)
	}
}