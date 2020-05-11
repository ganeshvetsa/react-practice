import React, {Component, Suspense} from 'react';
import './App.scss';
import {
  Route,
  BrowserRouter, Switch, Link, Redirect
} from "react-router-dom";
import Home from "./Home";
import CoronavirusHome from "./coronavirus/Home";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from '@material-ui/icons/Menu';
import {withStyles} from "@material-ui/core";
import Country from "./coronavirus/Country";
import Home2 from "./coronavirus/Home2";

const UsersHome = React.lazy(() => import("./users/UsersHome"));
const CreateUser = React.lazy(() => import("./users/CreateUser"));
const Login = React.lazy(() => import("./Login"));

const headerStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    border: "none",
    color: "inherit",
    textDecoration: "none",
    cursor: "pointer"
  },
});

class App extends Component {

  render() {
    let {classes} = this.props;
    // console.log(this.props.match.path);
    return (
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <div className={classes.root}>
              <AppBar position="static">
                <Toolbar>
                  <IconButton edge="start" className={classes.menuButton}
                              color="inherit" aria-label="menu">
                    <MenuIcon/>
                  </IconButton>
                  <Link to={"/home"} className={classes.title}>
                    <Typography variant="h6">
                      Home
                    </Typography>
                  </Link>
                  <Button color="inherit" component={Link}
                          to={"/login"}>Login</Button>
                </Toolbar>
              </AppBar>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/coronavirus" component={CoronavirusRouter}/>
                <PrivateRoute path="/users"
                              component={UsersRouter}/>
                <Route exact path="/login" component={Login}/>
                <Redirect to="/"/>
              </Switch>
            </div>
          </Suspense>
        </BrowserRouter>)
  }
}

const PrivateRoute = (props) => {
  console.log(props.location);
  let {path, component} = props;
  return isAuthenticated() ? <Route path={path} component={component}/> :
      <Redirect to={{pathname: "/login", state: {from: props.location}}}/>;
}

const isAuthenticated = () => {
  return true;
  // return sessionStorage.getItem("isLoggedIn");
};

class CoronavirusRouter extends Component {
  render() {
    let {path} = (this.props.match);
    return (
        <Switch>
          <Route exact path={`${path}`} component={CoronavirusHome}/>
          <Route path={`${path}/home2`} component={Home2}/>
          <Route path={`${path}/countries/:id`} component={CountryRouter}/>
          <Redirect to={`${path}`}/>
        </Switch>
    )
  }
}

class UsersRouter extends Component {
  render() {
    let {path} = this.props.match;
    console.log("Hi", path);
    return <Switch>
      <Route exact path={`${path}`} component={UsersHome}/>
      <Route path={`${path}/create`} component={CreateUser}/>
      <Redirect to={`${path}`}/>
    </Switch>
  }
}

class CountryRouter extends Component {
  render() {
    let {path} = (this.props.match);
    console.log(this.props.match);
    return (
        <Switch>
          <Route exact path={`${path}`} component={Country}/>
          <Redirect to={`${path}`}/>
        </Switch>
    )
  }
}

export default withStyles(headerStyles)(App);

