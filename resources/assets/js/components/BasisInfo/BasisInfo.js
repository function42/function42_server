import React, { Component } from 'react';

export class BasisInfo extends React.Component {
	constructor () {
		super();
		this.state = {
		  level: 3,
		  self_code: "",
		  count_num: "",
		};
	}

	componentWillMount () {
		this.fetchData()
	}

	fetchData () {
		var that = this
		// axios.get('/user')
		// .then(function (response) {
		//   that.setState({
		// 		level: response.data.level,
		// 		self_code: response.data.self_code,
		//   })
		// }).catch(function (error) { console.log(error); });

		axios.get('/count')
		.then(function (response) {
			console.log(response)
		  that.setState({
				count_num: response.data,
		  })
		}).catch(function (error) { console.log(error); });
	}

	render () {
		return (
			// <p>邀请码为 {this.state.self_code}</p>
			<h1>目前催更数为 {this.state.count_num}</h1>
		)
	}
}