import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';


class Search extends Component {

    state = {
        query: null,
        posts: [],
        satus: null,
        currentPage: 0,
        stepSize: 5
    };

    componentDidMount() {
        this.getPosts();
        this.getQuery();
    }

    getPosts = () => {
        let endpoint = 'https://jsonplaceholder.typicode.com/posts';
        axios.get(endpoint)
            .then((res) => {
                this.setState({
                    posts: res.data,
                    status: 'success'
                });
            }).catch((err) => {
                this.setState({
                    posts: [],
                    status: 'failed'
                });
            });
    };

    getQuery = () => {
        let query = this.props.match.params.query;
        this.setState({
            query: query
        });
    };

    getFilteredList = () => {
        let posts = this.state.posts;
        let query = this.state.query;

        let filteredList = posts.filter((post) => {
            return (post.title.includes(query) || post.body.includes(query));
        });

        return filteredList;
    };

    increasePage = () => {
        let nextPage = this.state.currentPage + 1;
        let stepSize = this.state.stepSize;

        if (nextPage * stepSize < this.getFilteredList().length) {
            this.setState({
                currentPage: nextPage
            });
        }
    };

    decreasePage = () => {
        let previousPage = this.state.currentPage - 1;
        let stepSize = this.state.stepSize;

        if (previousPage * stepSize >= 0) {
            this.setState({
                currentPage: previousPage
            });
        }
    };

    render() {
        let stepSize = this.state.stepSize;
        let strPostIndex = this.state.currentPage * stepSize;

        if (this.state.posts.length > 0) {

            let filteredList = this.getFilteredList();
            if (filteredList.length == 0) {
                return (
                    <div className="container canvas mt-5 py-5">
                        <h4 className="text-center">No se han encontrado elementos.</h4>
                    </div>
                );
            }

            let filteredPosts = filteredList.slice(strPostIndex, strPostIndex + stepSize)
                .map((post, index) => {
                    return (
                        <div key={index}>
                            <Link to={'/comments/' + post.id}>
                                <h4 className="mt-4"><strong>{post.title.toUpperCase()}</strong></h4>
                            </Link>

                            <h5 className="my-4"><strong><i>{post.body}</i></strong></h5>
                            <hr />
                        </div>
                    );
                });

            return (
                <React.Fragment >
                    <div className="container canvas mt-3 p-5">
                        <h1 className="text-center ">"{this.state.query}"</h1>

                        <div className="my-1 text-center">
                            <button className="btn btn-primary" onClick={this.decreasePage}>anterior</button>
                            <span className="mx-3"><strong>Página {this.state.currentPage+1}</strong></span>
                            <button className="btn btn-primary" onClick={this.increasePage}>próxima</button>
                        </div>
                    </div>

                    <div className="container canvas mt-3 p-3">
                        {filteredPosts}
                    </div>
                </React.Fragment>
            );
        }

        return (
            <div className="container">
                <h3 className="text-center">cargando...</h3>
            </div>
        );
    };
}

export default Search;