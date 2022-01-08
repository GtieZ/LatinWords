import React, { Component } from "react";
import { Link } from 'react-router-dom';

import axios from "axios";


class Posts extends Component {

    state = {
        posts: [],
        status: null,
        currentPage: 0,
        stepSize: 5
    };

    componentDidMount() {
        this.getPosts();
    }

    getPosts = () => {
        let endpoint = 'https://jsonplaceholder.typicode.com/posts';
        axios.get(endpoint)
            .then(res => {
                this.setState({
                    posts: res.data,
                    status: 'success'
                });
            }).catch(err => {
                this.setState({
                    posts: [],
                    status: 'failed'
                });
            });
    };

    increasePage = () => {
        let stepSize = this.state.stepSize;
        let nextPage = this.state.currentPage + 1;

        if (nextPage * stepSize < this.state.posts.length) {
            this.setState({
                currentPage: nextPage
            });
        }
    };

    decreasePage = () => {
        let stepSize = this.state.stepSize;
        let previousPage = this.state.currentPage - 1;

        if (previousPage * stepSize >= 0) {
            this.setState({
                currentPage: previousPage
            });
        }
    };

    render() {
        let posts = this.state.posts;
        let stepSize = this.state.stepSize;
        let strPostIndex = this.state.currentPage * stepSize;

        if (this.state.posts.length > 0) {
            let listPosts = posts.slice(strPostIndex, strPostIndex + stepSize)
                .map((post, index) => {
                    return (
                        <div key={index}>
                            <Link to={'/comments/' + post.id}>
                                <h4 className="mt-4"><strong>{post.title.toUpperCase()}</strong></h4>
                            </Link>
                            <h5 className="my-4"><i><strong>{post.body}</strong></i></h5>
                            <hr />
                        </div>
                    );
                });

            return (
                <React.Fragment>
                    <div className="container canvas mt-3 p-5">
                        <h1 className=" text-center">ἐπί-γραφὼ</h1>

                        <div className="my-1 text-center">
                            <button className="btn btn-primary" onClick={this.decreasePage}>anterior</button>
                            <span className="mx-3"><strong>Página {this.state.currentPage + 1}</strong></span>
                            <button className="btn btn-primary" onClick={this.increasePage}>próxima</button>
                        </div>

                    </div>

                    <div className="container canvas mt-3 pt-3">

                        {listPosts}
                        <hr />

                    </div>

                </React.Fragment>
            );
        }

        return (
            <h3 className="text-center">cargando...</h3>
        );
    }

}

export default Posts;