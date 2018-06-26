import React, { Component } from 'react';
import { Layout, Menu, Icon, Button } from 'antd';

export class ArticleEdit extends React.Component {
	render () {
		return (
			<div>
				<Button className="btn_header" type="primary">创建新文章</Button>
				<p>下为列表</p>
			</div>
		)
	}
}