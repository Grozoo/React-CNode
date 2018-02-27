import React from 'react';
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

import { Header, Footer } from '../components/';
import {
  HomePage,
  Login,
  NewTopic,
  User,
  UserHome,
  Update,
  Message,
  Topic
} from '../containers/index';

//重定向
const LoginComponent = ({ component: Component, ...data }) => (
  <Route
    {...data}
    render={props =>
      localStorage.token ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

function test(c, props) {
  console.log(c);
  switch (c) {
    case 'good':
    default:
      return <Header {...props} />;
  }
}

const QueryComponent = ({ component: Component, ...data }) => {
  console.log({ ...data }, 1111);
  return (
    <Route {...data} render={props => test(props.location.query, props)} />
  );
};

const NotFound = () => <h1>404 NotFound</h1>;
const App = () => {
  return (
    <Router>
      <div>
        {/* <Header /> */}
        <Switch>
          <QueryComponent path="/:a" />
          {/* <Route exact path="/" component={HomePage} /> */}
          <LoginComponent path="/newtopic" component={NewTopic} />
          <LoginComponent path="/messages" component={Message} />
          <LoginComponent path="/userhome" component={UserHome} />
          <Route path="/login" component={Login} />
          <Route exact path="/topic/:id" component={Topic} />
          <Route path="/topic/:id/edit" component={Update} />
          <Route path="/user/:loginname" component={User} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
