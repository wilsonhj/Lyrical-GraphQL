import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Link } from 'react-router-dom'; 
import query from '../queries/fetchSongs';

const SongList = (props) => {
  const { loading, error, data } = useQuery(query);
  const [deleteSong] = useMutation(DELETE_SONG);

  if (loading) return 'Loading...';
  if (error) return `Error ${error.message}`;

  const handleSongDelete = (id) => {
    deleteSong({ // mutate function 
      variables: { id }, 
      refetchQueries: [{ query }] // updates DOM immediately
    });
  };

  return (
    <div>
      <ul className="collection">
        {data.songs.map(({ id, title }) => 
          <li key={id} className="collection-item">
            {title}
            <i className="material-icons" onClick={() => handleSongDelete(id)}>
              delete
            </i>
          </li>
        )}
      </ul>
      <Link to="/songs/new" className="btn-floating btn-large red right">
        <i className="material-icons">add</i>
      </Link>
    </div>
  ); 
};

const DELETE_SONG = gql`
  mutation DeleteSong($id: ID!){
    deleteSong(id: $id){
      id
    }
  }
`;


export default SongList;
