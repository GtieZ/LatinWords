import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class NavBar extends React.Component {

    queryRef = React.createRef();

    state = {
        query: null,
        redirect: false
    };

  
    sendQuery = (e) => {
        e.preventDefault();
        let query = this.queryRef.current.value;
        this.setState({
            query: query,
            redirect: true
        });
    };

    componentDidUpdate(){
        if(this.state.redirect){
            this.setState({
                redirect: false
            });

        }
    }


    render() {
        if (this.state.query && this.state.redirect) {

            return <Redirect to={'/redirect/' + this.state.query} />
        }

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
                <div className="container-fluid">
                    <Link to={'/posts'} className="navbar-brand"><strong>LatinWords</strong></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        </ul>

                        <form className="d-flex" onSubmit={this.sendQuery}>
                            <input className="form-control me-2" type="search"
                                placeholder="Search" aria-label="Search"
                                ref={this.queryRef}
                            />
                            <button className="btn btn-outline-light" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;