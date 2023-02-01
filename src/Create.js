import React, { useState } from 'react'
import Nav from './Nav'
import axios from 'axios'

const Create = () => {
  // state
  const [state, setState] = useState({
    title: '',
    content: '',
    user: '',
  })

  // destructure values from state
  const { title, content, user } = state

  // onchange event handler
  const handleChange = (name) => (event) => {
    console.log('name', name, 'event', event.target.value)
    // setState({ ...state, [name]: event.target.value });
    setState({ title, content, user, [name]: event.target.value })
  }
  console.log(state)
  console.log('title', title)
  console.log('content', content)
  console.log('user', user)
  console.table({ title, content, user })
  console.log('process.env.REACT_APP_API', process.env.REACT_APP_API)

  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      //promises
      .post(`${process.env.REACT_APP_API}/post`, { ...state })
      //   .post(`${process.env.REACT_APP_API}/post`, { title, content, user })
      //process
      .then((response) => {
        console.log(response)
        //empty state
        // setState({ ...state, title: "", content: "", user: "" });
        // setState({ title: "", content: "", user: "" }); //! iisa lang
        setState({ ...state })
        // show sucess alert
        alert(`Post titled ${response.data.title} is created`)
      })
      //error response
      .catch((error) => {
        console.log(error.response)
        alert(error.response.data.error)
      })
  }

  // function handleChange(name) {
  //     return function(event) {
  //         setState({ ...state, [name]: event.target.value });
  //     };
  // }

  //FORM
  return (
    <div className="container p-5">
      <Nav />
      <h1>CREATE POST</h1>
      <br />
      {JSON.stringify(state)}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input
            onChange={handleChange('title')}
            value={title}
            type="text"
            className="form-control"
            placeholder="Post title"
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Content</label>
          <textarea
            onChange={handleChange('content')}
            value={content}
            type="text"
            className="form-control"
            placeholder="Write something.."
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted">User</label>
          <input
            onChange={handleChange('user')}
            value={user}
            type="text"
            className="form-control"
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <button className="btn btn-primary" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  )
  //END FORM
}

export default Create
