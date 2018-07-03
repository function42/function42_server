import "./ArticleEdit.css"
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Input, Icon, Switch, Notification } from 'antd';
const { TextArea } = Input;
import marked from 'marked'

export class ArticleEdit extends React.Component {
	constructor (props) {
		super();
		this.state = {
			id: props.match.params.id,
			title: "",
			content: "",
			previewTitle: "",
			previewContent: "",
			is_public: 1,
		}
		Notification.config({
			duration: 3,
    	placement: 'topLeft',
		})
	}

	componentWillMount () {
		if (this.state.id) {
			this.fetchData()
			// console.log('we got a edit situation here')
		} else {
			// console.log('we got a create situation here')
		}
	}

	fetchData () {
		let that = this
		axios.get('/articles/get/'+that.state.id)
    .then(function (response) {
    	let article = response.data.article
      that.setState({
	      title: article.title,
				content: article.content,
				previewTitle: "<h1>"+article.title+"</h1>",
				previewContent: marked(article.content, {breaks: true}),
				is_public: article.is_public
      })
    }).catch(function (error) { console.log(error); });
	}


	onTitleChange (e)  {
		// console.log(e.target.value)
		this.setState({
    	title: e.target.value,
    	previewTitle: "<h1>"+e.target.value+"</h1>"
  	})
	}

	onContentChange (e)  {
		// console.log(e.target.innerText)
		this.setState({
			content: e.target.innerText,
    	previewContent: marked(e.target.innerText, {breaks: true})
  	})
	}

	changePulic () {
		this.setState({
			is_public: (this.state.is_public + 1 ) % 2
		})
	}

	handleSave (e) {
		let that = this
		axios.post('/articles/save', {
			id: that.state.id,
			title: that.state.title,
			content: that.state.content,
			is_public: that.state.is_public,
		}).then(function (response) {
      Notification["success"]({
	    	message: '文章保存成功',
	    	description: '正在跳转',
	  	})
	  	that.props.history.push('/articles')
    }).catch(function (error) { console.log(error); });
	}

	handlePreview (e) {
		// console.log(this)
		// this.props.history.push('/articles')
		console.log('want a preview')
	}

	handleImport (e) {
		console.log("want a import")
	}

	render () {
		return (
			<div>
				<div className="btn_group">
					<Link to="/articles">
						<Button className="btn_default">返回</Button>
					</Link>
					<Button className="btn_default" type="primary" onClick={this.handlePreview.bind(this)}>预览</Button>
					<Button className="btn_default" type="dashed" onClick={this.handlePreview.bind(this)}>导入</Button>
				</div>
				<div className="edit_containter">
					<input
						className = "edit_title"
						type = "text"
						value = {this.state.title}
						onChange = {this.onTitleChange.bind(this)} />
					<div
						className = "edit_content"
						dangerouslySetInnerHTML={{__html: this.state.content}}
						contentEditable = "plaintext-only"
						onInput = {this.onContentChange.bind(this)} />
				</div>
				<div className="btn_group">
					<Switch checked={Boolean(this.state.is_public)} checkedChildren="公开" unCheckedChildren="隐藏" onChange={this.changePulic.bind(this)} />
					<Button className="btn_default" type="primary" onClick={this.handleSave.bind(this)}>保存</Button>
				</div>
				<div className="preview_containter">
					<div dangerouslySetInnerHTML={{__html: this.state.previewTitle}}/>
					<div dangerouslySetInnerHTML={{__html: this.state.previewContent}}/>
				</div>
			</div>
		)
	}
}