import "./Main.css"
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, HashRouter, Route, Link } from 'react-router-dom';
import { Layout, Menu, Icon, Button } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { BasisInfo } from './BasisInfo/BasisInfo'
import { ArticleEdit } from './ArticleEdit/ArticleEdit'



export default class Main extends Component {
	constructor () {
		super();
		this.state = {
		  level: 3,
		  self_code: "",
		};
	}

	logout () {
		axios.post('logout')
    .then(function (response) {
      location.reload()
    }).catch(function (error) { console.log(error); });
	}

	render () {
		return (
			<HashRouter>
				<Layout>
					<Sider className="sider" style={{ position: 'fixed' }}>
						<Menu theme="dark" mode="inline">
							<Menu.Item key="basis_info">
								<Link to="/BasisInfo">
							  	<Icon type="user" />
							  	<span className="nav-text">基本信息</span>
							  </Link>
							</Menu.Item>
							<Menu.Item key="article_edit">
								<Link to="/ArticleEdit">
							  	<Icon type="file-text" />
							  	<span className="nav-text">文章编辑</span>
							  </Link>
							</Menu.Item>
						</Menu>
					</Sider>

					<Layout style={{ marginLeft: 200 }}>
						<Header style={{ background: '#fff', padding: 0 }}>
							<Button className="btn_header" href="/">Home</Button>
							<Button className="btn_header" type="primary" onClick={this.logout}>Logout</Button>
						</Header>
						<Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
							<Route path="/BasisInfo" exact component={BasisInfo}/>
							<Route path="/ArticleEdit" exact component={ArticleEdit}/>						
							<p>Welcome Aboard!</p>
						</Content>
						<Footer style={{ textAlign: 'center' }}>
							For me!
						</Footer>
					</Layout>
				</Layout>
			</HashRouter>
		);
	}
}

if (document.getElementById('root')) {
	ReactDOM.render(<Main />, document.getElementById('root'));
}
