import React from 'react';
import ReactDOM from 'react-dom';
import SongList from './components/SongList';
import App from './components/App';
import SongCreate from './components/SongCreate';
import { BrowserRouter, Switch, Route, Link} from 'react-router-dom';


import { ApolloClient, InMemoryCache, gql, useQuery, createHttpLink, ApolloProvider } from '@apollo/client';

const cache = new InMemoryCache();
const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const client = new ApolloClient({
  link: link,
  cache: cache
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter >
        <ul>
          <li><Link to='/'>App</Link></li>
          <li><Link to='songs/new'>Song Create</Link></li>
        </ul>
        <hr/>
        
        <Route exact path='/' component={App}/>
        <Route exact path='/' component={SongList}/>
        <Route exact path="songs/new" component={SongCreate} />

        
      </BrowserRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
