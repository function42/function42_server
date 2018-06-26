import React, { Component } from 'react';

export class BasisInfo extends React.Component {
	constructor () {
		super();
		this.state = {
		  level: 3,
		  self_code: "",
		};
	}

	componentWillMount () {
		this.fetchData()
	}

	fetchData () {
		var that = this
		axios.get('/user')
		.then(function (response) {
		  that.setState({
				level: response.data.level,
				self_code: response.data.self_code,
		  })
		}).catch(function (error) { console.log(error); });
	}

	render () {
		return (
			<p>邀请码为 {this.state.self_code}</p>
		)
	}
}