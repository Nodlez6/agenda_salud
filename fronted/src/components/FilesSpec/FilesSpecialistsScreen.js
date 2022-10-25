import React from 'react'
import { useState } from 'react'
import { Button, Card, CardContent } from "@mui/material";
import { FilesPacient } from './FilesPacient';
import { MyFiles } from './MyFiles';
import { Container } from '@mui/system';


const axios = require("axios").default;
export const FilesSpecialistsScreen = () => {

  const [file, setFile] = useState();
  const [MyFilesShow, setMyFilesShow] = useState(true);
  const [PacientFilesShow, setPacientFilesShow] = useState(false);
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
    <Container sx={{mt: 3}}>
       <Button
            onClick={() => {
              setMyFilesShow(true);
              setPacientFilesShow(false);
            }}
          >
            Mis Archivos
          </Button>
          <Button
            onClick={() => {
              setMyFilesShow(false);
              setPacientFilesShow(true);
            }}
          >
            Archivos pacientes
          </Button>
            {
              MyFilesShow && (
                <MyFiles/>
              )
            }
            {
              PacientFilesShow && (
                <FilesPacient/>
              )
            }


        {/* <form onSubmit={submit} style={{width:650}} className="flex flex-col space-y-5 px-5 py-14">
          <input onChange={fileSelected} type="file"></input>
          <button type="submit">Submit</button>
        </form> */}

    </Container>
  )
}

