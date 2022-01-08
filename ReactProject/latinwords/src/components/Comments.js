import React, { Component } from "react";
import axios from "axios";


class Comments extends Component {

    state = {
        comments: [],
        status: null
    };


    componentDidMount() {
        let postId = this.props.match.params.id;
        this.getComments(postId);
    }

    getComments = (postId) => {
        let endpoint = 'https://jsonplaceholder.typicode.com/post/' + postId.toString() + '/comments';
        axios.get(endpoint)
            .then(res => {
                this.setState({
                    comments: res.data,
                    status: 'success'
                });
            }).catch(err => {
                this.setState({
                    comments: [],
                    status: 'failed'
                });
            });
    };

    render() {
        if (this.state.comments.length > 0) {
            let listComment = this.state.comments
                .map((comment, index) => {
                    return (
                        <div key={index} className="alert alert-primary">
                            <p className="email">from: <strong>{comment.email}</strong></p>
                            <h4 className="mt-4"><strong>{comment.name.toUpperCase()}</strong></h4>
                             <p className="comment mt-3"><i>{comment.body}</i></p>
                            <hr />
                        </div>
                    );
                });

            return (
                <div className="container mt-5">{listComment}</div>
            );
        }

        return (
            <h2 className="text-center">cargando...</h2>
        );
    }
}


export default Comments;