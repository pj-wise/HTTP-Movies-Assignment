import React, { useState, useEffect } from 'react';
import axios from "axios";

const UpdateMovie = props => {
  const [edit, setEdit] = useState({ id: 0, title: '', director: '', metascore: 0, stars: [] });

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log('test', res)
        //setEdit(res.data)
        setEdit(res.data);
      })
      .catch(err => console.log(err.response));
  };

  useEffect(() => {
    fetchMovie(props.match.params.id);
  }, []);

  const handleChange = e => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  }

  const handleStarsChange = (e, i) => {
    let tmp = edit.stars.slice();
    tmp[i] = e.target.value;
    setEdit({ ...edit, stars: tmp });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${props.match.params.id}`, edit)
      .then(res => {
        console.log('edit',res);
        let tmp = props.movies.map(movie=>{
          if(`${movie.id}`===props.match.params.id){
            return res.data;
          } else {
            return movie;
          }
        })
        setEdit({ id: 0, title: '', director: '', metascore: 0, stars: [] });
        props.setMovies(tmp);
        props.history.push('/');

      })
      .catch(err => console.log("error", err.response));
  }

  return (
    <form className='movieForm' onSubmit={handleSubmit}>
      <div className='input'>
        <label htmlFor='title'>Title: </label>
        <input
          type='text'
          name='title'
          id='title'
          value={edit.title}
          onChange={handleChange}
        />
      </div>
      <div className='input'>
      <label htmlFor='director'>Director: </label>
        <input
          type='text'
          name='director'
          id='director'
          value={edit.director}
          onChange={handleChange}
        />
      </div>
      <div className='input'>
      <label htmlFor='metascore'>Metascore: </label>
        <input
          type='number'
          name='metascore'
          id='metascore'
          value={edit.metascore}
          onChange={handleChange}
        />
      </div>
      <label >Stars: </label>
      {edit.stars.map((star, i) => {
        return (
          <div>
            <input
              type='text'
              name={`stars`}
              value={star}
              onChange={(e) => handleStarsChange(e, i)}
            />
          </div>
        )
      })}
      <button>Edit</button>
    </form>
  );
}

export default UpdateMovie;