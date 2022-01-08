import React, { Component } from "react";
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import NotFound from "./NotFound";
import NavBar from './NavBar';
import Posts from "./Posts";
import Comments from "./Comments";
import Search from "./Search";




class Router extends Component {

    render() {

        return (

            <HashRouter>

                <header className="container bg-primary" >
                    <NavBar />
                </header>

                <Switch>
                    <Route exact path="/" component={Posts} />
                    <Route exact path="/posts" component={Posts} />
                    <Route exact path="/comments/:id" component={Comments} />
                    <Route path="/search/:query" component={Search} />
                    <Route exact path="/redirect/:query" render={
                        (props) => {
                            let query = props.match.params.query;
                            return <Redirect to={'/search/' + query} />
                        }
                    }
                    />

                    <Route component={NotFound} />
                </Switch>

            </HashRouter>


        );
    }
}


export default Router;