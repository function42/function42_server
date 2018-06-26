import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Main extends Component {
    constructor() {
        super();
        this.state = {
          level: 3,
          self_code: '',
        };
    }

    componentWillMount() {
        this.fetchData()
    }

    fetchData(){
        var that = this
        axios.get('/user')
        .then(function (response) {
          console.log(response.data);
          that.setState({
            level:response.data.level,
          })
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Main Component</div>

                            <div className="card-body">
                                I'm an main component!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
