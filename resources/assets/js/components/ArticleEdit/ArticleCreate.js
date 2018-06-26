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

	onContentChange (e)  {
		console.log(e.target.innerText)
		console.log(marked(e.target.innerText, {breaks: true}))
		this.setState({
    	previewContent: marked(e.target.innerText, {breaks: true})
  	})
	}

	render () {
		return (
			<div>
				<div className="btn_group">
					<Link to="/articles">
						<Button className="btn_header">返回</Button>
					</Link>
					<Button className="btn_header" type="primary">发出</Button>
					<Button className="btn_header" type="primary">保存</Button>
					<Button className="btn_header" type="primary">预览</Button>
				</div>
				<input type="text" placeholder="输入文章标题..." spellCheck="false" />
				<div key='main'>		
					<div
						className = "edit_containter"
						contentEditable = "plaintext-only"
						onInput = { this.onContentChange.bind(this) } />
				</div>
			</div>
		)
	}
}