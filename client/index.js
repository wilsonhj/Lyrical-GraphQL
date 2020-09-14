import React from 'react';
import ReactDOM from 'react-dom';
import SongList from './components/SongList';
import App from './components/App';
import SongCreate from './components/SongCreate';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import { ApolloClient, InMemoryCache, gql, useQuery, createHttpLink, ApolloProvider } from '@apollo/client';

const cache = new InMemoryCache();
const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const client = new ApolloClient({
  link: link,
  cache: cache
});

// client
//   .query({
//     query: gql`
//       query GetRates {
//         rates(current: "USD"){
//           currency
//         }
//       }
//     `
//   })
//   .then(res => console.log(res));

// const EXCHANGE_RATES = gql`
//   query GetExchangeRates{
//     rates(currency: "USD"){
//       currency
//       rate
//     }
//   }
//   `;

// function ExchangeRates() {
//   const { loading, error, data } = useQuery(EXCHANGE_RATES);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :(</p>;

//   return data.rates.map(({ currency, rate }) => (
//     <div key={currency}>
//       <p>
//         {currency}: {rate}
//       </p>
//     </div>
//   ));
// };



const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router >
        <Switch>
          <Route exact path='/' component={App}/>
          <Route path='/' component={SongList}/> // todo 
          <Route exact path="songs/new" component={SongCreate} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
