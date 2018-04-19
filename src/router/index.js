import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import asyncComponent from '../util/asyncComponent';
import LoginComponent from '../util/loginComponent';
import Header from '../component/header/Header';

const AsyncHomePage = asyncComponent(() => import('../view/index/'));
const AsyncTopic = asyncComponent(() => import('../view/topic/Topic'));
const AsyncLogin = asyncComponent(() => import('../view/login/Login'));
const AsyncUser = asyncComponent(() => import('../view/user/User'));

const Routes = () => (
  <BrowserRouter>
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/" exact component={AsyncHomePage} />
        <Route exact path="/topic/:id" component={AsyncTopic} />
        <Route path="/login" component={AsyncLogin} />
        <Route path="/user/:loginname" component={AsyncUser} />

        {/* <LoginComponent path="/newtopic" component={NewTopic} />
      <LoginComponent path="/messages" component={Message} />
      <LoginComponent path="/userhome" component={UserHome} />
      <Route path="/topic/:id/edit" component={Update} /> */}

        {/* <Route path="*" component={NotMatch} /> */}
      </Switch>
    </React.Fragment>
  </BrowserRouter>
);

export default Routes;
