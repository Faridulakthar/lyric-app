import React from 'react';
import { Link } from 'react-router-dom';

const Track = ({ track }) => {
  return (
    <div className="col-md-6">
      <div className="card mb-4 shadwo-sm">
        <div className="card-body">
          <h5>{track.artist_name}</h5>
          <p className="card-text">
            <strong>
              <i className="fas fa-play"></i>
            </strong>{' '}
            Track: {track.track_name}
            <br />
            <strong>
              <i className="fas fa-compact-disc"></i>
            </strong>{' '}
            Album: {track.album_name}
          </p>
          <Link
            style={{ width: '100%' }}
            to={`lyrics/track/${track.track_id}`}
            className="btn btn-dark btn-block"
          >
            <i className="fa fa-chevron-right"></i> View Lyrics
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Track;
