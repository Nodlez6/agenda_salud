import React from 'react'
import { useState } from 'react'

const axios = require("axios").default;
export const FilesSpecialistsScreen = () => {

  const [file, setFile] = useState();
  const fileSelected = event => {
    const file = event.target.files[0]
		setFile(file)
	}

  const submit = async event => {
    event.preventDefault()

    const formData = new FormData();
    formData.append("image", file)
    await axios.post(`${process.env.REACT_APP_API_URL}/files`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
  }
    

  return (
    <div className="flex flex-col items-center justify-center">

        <form onSubmit={submit} style={{width:650}} className="flex flex-col space-y-5 px-5 py-14">
          <input onChange={fileSelected} type="file"></input>
          <button type="submit">Submit</button>
        </form>

    </div>
  )
}

