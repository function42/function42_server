import "./ArticleCreate.css"
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from 'antd';
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
	}

	componentWillMount () {
		this.fetchData()
	}

	fetchData () {
		var that = this
	}

	onTitleChange (e)  {
		console.log(e.target.value)
		this.setState({
    	title: e.target.value,
    	previewTitle: "<h1>"+e.target.value+"</h1>"
  	})
	}

	onContentChange (e)  {
		console.log(e.target.innerText)
		this.setState({
			content: e.target.innerText,
    	previewContent: marked(e.target.innerText, {breaks: true})
  	})
	}

	handlePublish (e) {
		console.log("let me publish this.")
	}

	handleSave (e) {
		console.log(this.state)
	}

	handlePreview (e) {
		console.log(this.state)
	}

	render () {
		return (
			<div>
				<div className="btn_group">
					<Link to="/articles">
						<Button className="btn_header">返回</Button>
					</Link>
					<Button className="btn_header" type="primary" onClick={this.handlePreview.bind(this)}>预览</Button>
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
					<Button className="btn_header" onClick={this.handleSave.bind(this)}>保存</Button>
					<Button className="btn_header" type="primary" onClick={this.handlePublish.bind(this)}>发出</Button>
				</div>
				<div className="preview_containter">
					<div dangerouslySetInnerHTML={{__html: this.state.previewTitle}}/>
					<div dangerouslySetInnerHTML={{__html: this.state.previewContent}}/>
				</div>
			</div>
		)
	}
}