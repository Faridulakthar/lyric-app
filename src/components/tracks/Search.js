import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../../context';

const Search = () => {
  const [state, setState] = useState(Context);
  const [trackTitle, setTrackTitle] = useState('');
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}bieber&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP__MM_KEY}`
      )
      .then((res) => {
        console.log(res.data);
        let track_list = res.data.message.body.track_list;
        setState({ track_list: track_list, heading: "Search Results" })
      });
  }, [trackTitle]);

  const findTrack = (e) => {
    e.preventDefault();
    setTrackTitle(userInput);
  };

  const onChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="card card-body mb-4 p-4">
      <h1 className="display-4 text-center">
        <i className="fas fa-music" /> Search For A Song
      </h1>
      <p className="lead text-center">Get the lyrics for any song</p>
      <form onSubmit={findTrack}>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search song...."
            name="userInput"
            value={userInput}
            onChange={onChange}
          />
        </div>
        <button
          style={{ width: '100%' }}
          className="btn btn-primary btn-lg btn-block mt-4 mb-5"
          type="submit"
        >
          Get Track Lyrics
        </button>
      </form>
    </div>
  );
};

export default Search;
