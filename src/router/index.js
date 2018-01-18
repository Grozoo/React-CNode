import React from "react"
import { Switch, BrowserRouter as Router, Route, Redirect } from "react-router-dom"

import { HomePage, Login, NewTopic, User, UserHome, Update, Message, Topic } from '../containers/index'

//重定向
const LoginComponent = ({ component: Component, ...data }) => (
    <Route {...data} render={(props) => (
        localStorage.token ?
            <Component {...props} />
            : <Redirect to={{
                pathname: "/login",
                state: { from: props.location }
            }} />
    )} />
)

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <LoginComponent path='/newtopic' component={NewTopic} />
                <LoginComponent path='/messages' component={Message} />
                <LoginComponent path='/userhome' component={UserHome} />
                <Route path="/login" component={Login} />
                <Route exact path='/topic/:id' component={Topic} />
                <Route path='/topic/:id/edit' component={Update} />
                <Route path='/user/:loginname' component={User} />
            </Switch>
        </Router>
    )
}


export default Routes
