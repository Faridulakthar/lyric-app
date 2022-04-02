import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
// import Moment from 'react-moment';

import Spinner from '../layout/spinner';

const Lyrics = (props) => {
  const { id } = useParams(props);
  const [track, setTrack] = useState({});
  const [lyrics, setLyrics] = useState({});


  useEffect(() => {
    axios
      .get(
        `http://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=${process.env.REACT_APP__MM_KEY}`
      )
      .then(async (res) => {
        // console.log(res.data);
        let lyrics = res.data.message.body.lyrics;
        setLyrics( lyrics );

        const res_1 = await axios
          .get(
            `http://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${id}&apikey=${process.env.REACT_APP__MM_KEY}`
          );
        // console.log(res_1.data);
        let track = res_1.data.message.body.track;
        setTrack({ track });
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (
    track === undefined ||
    lyrics === undefined ||
    Object.keys(track).length === 0 ||
    Object.keys(lyrics).length === 0
  ) {
    return <Spinner />;
  } else {
    return (
      <>
        <Link to="/" className="btn btn-dark btn-sm mb-4">
          Go back
        </Link>
        <div className="card">
          <h5 className="card-header">
            {track.track_name} by{' '}
            <span className="text-secondary">{track.artist_name}</span>
          </h5>
          <div className="card-body">
            <p className="card-text">{lyrics.lyrics_body}</p>
          </div>
        </div>

        <ul className="list-group mt-3">
          <li className="list-group-item">
            <strong>Album ID</strong>: {track.track.album_id}
          </li>
          <li className="list-group-item">
            <strong>Song Genre</strong>:{' '}
            {track.track.primary_genres.music_genre_list.length === 0
              ? 'NO GENRE AVAILABLE'
              : track.track.primary_genres.music_genre_list[0].music_genre
                  .music_genre_name}
          </li>
          <li className="list-group-item">
            <strong>Explicit Words</strong>:{' '}
            {track.track.explicit === 0 ? 'No' : 'Yes'}
          </li>
          <li className="list-group-item">
            <strong>Release Date</strong>:{' '} 
            {track.track.first_release_date}
          </li>
        </ul>
      </>
    );
  }
};

export default Lyrics;
