import React from 'react'
import { useState } from 'react'
import { Box, Button, Card, CardContent } from "@mui/material";
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
    var now=new Date();
    console.log(now)

    // const formData = new FormData();
    // formData.append("image", file)
    // await axios.post(`${process.env.REACT_APP_API_URL}/files`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
  }
  // const submit = async event => {
  //   event.preventDefault()
  //   const path="poder/"
  //   await axios.get(`${process.env.REACT_APP_API_URL}/files/${path}`)
  // }
  // const submit = async event => {
  //   event.preventDefault()
  //   const path="poder"
  //   const key="20299103-3___HEMOGLOBINA_GLICOSILADA (3).pdf"
  //   await axios.get(`${process.env.REACT_APP_API_URL}/files/${path}/${key}`)
  // }

  return (
    <Container sx={{mt: 3}}>
      <Box sx={{mb:2}}>
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
        </Box>
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
        

    </Container>
  )
}

