import React from 'react';
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

import {
  HomePage,
  Login,
  NewTopic,
  User,
  UserHome,
  Update,
  Message,
  Topic,
  NotMatch
} from '../views/index';
import { Affix } from 'antd';
import FaGithub from 'react-icons/lib/fa/github';
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
const Routes = () => {
  return (
    <Router>
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <LoginComponent path="/newtopic" component={NewTopic} />
          <LoginComponent path="/messages" component={Message} />
          <LoginComponent path="/userhome" component={UserHome} />
          <Route path="/login" component={Login} />
          <Route exact path="/topic/:id" component={Topic} />
          <Route path="/topic/:id/edit" component={Update} />
          <Route path="/user/:loginname" component={User} />
          <Route path="*" component={NotMatch} />
        </Switch>
        <Affix
          style={{
            position: 'fixed',
            bottom: '10%',
            right: '10%',
            cursor: 'pointer'
          }}
        >
          <i
            onClick={() =>
              (window.location = 'https://github.com/ShiYiYa/cnode')
            }
          >
            <FaGithub style={{ width: 50, height: 50 }} />
          </i>
        </Affix>
      </React.Fragment>
    </Router>
  );
};

export default Routes;
