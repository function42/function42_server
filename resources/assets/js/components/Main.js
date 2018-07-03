import "./Main.css"
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, HashRouter, Route, Link } from 'react-router-dom';
import { Layout, Menu, Icon, Button } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { BasisInfo } from './BasisInfo/BasisInfo'
import { ArticleList } from './Article/ArticleList'
import { ArticleEdit } from './Article/ArticleEdit'



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
								<Link to="/info">
							  	<Icon type="user" />
							  	<span className="nav-text">基本信息</span>
							  </Link>
							</Menu.Item>
							<Menu.Item key="article_edit">
								<Link to="/articles">
							  	<Icon type="file-text" />
							  	<span className="nav-text">文章编辑</span>
							  </Link>
							</Menu.Item>
						</Menu>
					</Sider>

					<Layout style={{ marginLeft: 200 }}>
						<Header style={{ background: '#fff', padding: "6px", height: "50px" }}>
							<Button className="btn_default" href="/">Home</Button>
							<Button className="btn_default" type="primary" onClick={this.logout}>Logout</Button>
						</Header>
						<Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
							<Route path="/info" exact component={BasisInfo}/>
							<Route path="/articles" exact component={ArticleList}/>						
							<Route path="/articles/create" exact component={ArticleEdit}/>
							<Route path="/articles/edit/:id" exact component={ArticleEdit}/>					
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
