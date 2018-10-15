import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

// eslint-disable-next-line
import globalStyles, { styles } from './Components/Styles';

import App from './Components/App';
import Post from './Components/Post';
import unregister from './sw';

ReactDOM.render(
  <Router>
    <main role="main" className={styles.main}>
      <h1 className={styles.h1}>UNLIKELY.COMPUTER</h1>
      <p className={styles.meta}>
        <a href="http://unlikelycomputer.tumblr.com/">archive</a>
      </p>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/post/:postID" component={Post} />
      </Switch>
    </main>
  </Router>,
  document.getElementById('root'),
);
unregister();
