
import { Link, useLoaderData } from 'react-router-dom'
import './App.css'
import { useState } from 'react'

function App() {
  const allData = useLoaderData()
  const [data, setData] = useState(allData)

  const handleAddUSer = e => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const user = { name, email }
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(result => {
        console.log(result)
        if (result.insertedId) {
          alert('Success')
          form.reset()
        }
      })

  }

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(result => {
        console.log(result)
        const remaining = data.filter(dt => dt._id != id)
        setData(remaining)
      })
  }

  const update = (id) => {
    console.log(id)
    // fetch(`http://localhost:5000/users/${id}`, {
    //   method: 'PUT',
    //   headers: 
    // })
  }
  return (
    <>

      <h1>Simple CRUD</h1>

      <form onSubmit={handleAddUSer}>
        <input type="text" name="name" id="" />
        <input type="email" name="email" id="" />
        <input type="submit" value="Submit" />
      </form>

      {
        data.map(({ _id, name, email }) => <p key={_id}> {name} - {email} <Link to={`/users/${_id}`}><button onClick={() => update(_id)}>Update</button></Link> <button onClick={() => handleDelete(_id)}>X</button> </p>)
      }
    </>
  )
}

export default App
