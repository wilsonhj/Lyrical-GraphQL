import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Link, useHistory } from 'react-router-dom';


const SongCreate = (props) => {
  let history = useHistory(); // v4.0 useHistory hook instead of deprecated HashHistory 
  const [title, setTitle] = useState('');
  const [addSong, { data }] = useMutation(ADD_SONG);

  const handleChange = e => {
    setTitle({ title: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    addSong({ variables: { title } })
      .then(() => history.push('/')); //todo router history
  };
  return ( // nothing is rendered to DOM
    <div>
      <Link to="/">Back</Link>
      <h3>Create a New Song</h3>
      <form onSubmit={handleSubmit}> 
        <label>Song Title:</label>
        <input onChange={handleChange} value={title} />
      </form>
    </div>
  );
}

const ADD_SONG = gql `
  mutation AddSong($title: String) {
    addSong(title: $title){
      id
      title
    }
  }
`;

export default SongCreate;