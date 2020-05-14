import React, {useState, useEffect} from 'react';
import axios from "axios";

const AddMovie = props => {
  const [edit,setEdit] = useState({id:0, title:'',director:'',metascore:0,stars:[]});

  const handleChange = e => {
    setEdit({...edit, [e.target.name]:e.target.value});
  }

  const newStar = e => {
    e.preventDefault();
    setEdit({
      ...edit,
      stars: [
        ...edit.stars,
        ''
      ]
    });
  }

  const handleStarsChange = (e,i) => {
      let tmp = edit.stars.slice();
      tmp[i] = e.target.value;
      setEdit({...edit, stars:tmp});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setEdit({...edit, id: Date.now() });
    axios
    .post(`http://localhost:5000/api/movies/`, edit)
    .then(res=>{
      console.log('add',res);
      props.setMovies(res.data);
      setEdit({id:0, title:'',director:'',metascore:0,stars:[]});
      props.history.push('/');

    })
    .catch(err => console.log("error",err.response));
  }

  return(
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
      <button onClick={newStar}>Add Star</button>
      <button>Add</button>
    </form>
  );
}

export default AddMovie;