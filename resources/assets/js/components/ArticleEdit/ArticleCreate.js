import "./ArticleCreate.css"
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Input, Icon, Notification } from 'antd';
const { TextArea } = Input;
import marked from 'marked'

export class ArticleCreate extends React.Component {
	constructor () {
		super();
		this.state = {
			title: "",
			content: "",
			previewTitle: "",
			previewContent: "",
			is_public: 1,
		};
		Notification.config({
			duration: 3,
    	placement: 'topLeft',
		})
	}

	componentWillMount () {
		this.fetchData()
	}

	fetchData () {

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

	handlePublish (e) {
		let that = this
		axios.post('/articles/save', {
			title: that.state.title,
			content: that.state.content,
			is_public: 1,
		}).then(function (response) {
      Notification["success"]({
	    	message: '文章发布成功',
	    	description: '正在跳转',
	  	})
	  	that.props.history.push('/articles')
    }).catch(function (error) { console.log(error); });
	}

	handleSave (e) {
		let that = this
		axios.post('/articles/save', {
			title: that.state.title,
			content: that.state.content,
			is_public: 0,
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
						onChange = {this.onTitleChange.bind(this)} />
					<div
						className = "edit_content"
						contentEditable = "plaintext-only"
						onInput = {this.onContentChange.bind(this)} />
				</div>
				<div className="btn_group">
					<Button className="btn_default" onClick={this.handleSave.bind(this)}>保存</Button>
					<Button className="btn_default" type="primary" onClick={this.handlePublish.bind(this)}>发出</Button>
				</div>
				<div className="preview_containter">
					<div dangerouslySetInnerHTML={{__html: this.state.previewTitle}}/>
					<div dangerouslySetInnerHTML={{__html: this.state.previewContent}}/>
				</div>
			</div>
		)
	}
}