import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom'; 

const SongList = () => {
  const { loading, error, data } = useQuery(GET_SONGS);
  if (loading) return 'Loading...';
  if (error) return `Error ${error.message}`;

  return (
    <div>
      <ul className="collection">
        {data.songs.map(song => 
          <li key={song.id} className="collection-item">
            {song.title}
          </li>
        )}
      </ul>
      <Link to="/songs/new" className="btn-floating btn-large red right">
        <i className="material-icons">add</i>
      </Link>
    </div>
  ); 
};

const GET_SONGS = gql`
  query GetSongs {
    songs {
      title
      id
    }
  }
`;

export default SongList;

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