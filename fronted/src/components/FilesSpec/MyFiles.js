import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { AuthContext } from '../../auth/authContext';
export const MyFiles = () => {
    const [files, setFile] = React.useState([])
    const [filesArray, setFilesArray] = React.useState([])
    const hiddenFileInput = React.useRef(null);
    const [isValid, setIsValid] = React.useState(true)
    const { user } = useContext(AuthContext);
    const fileSelected = event => {
        const file = event.target.files[0]
        setFile(file)
        setIsValid(false)
    
    }
    useEffect(() => {
        if(files === undefined){
            setIsValid(true)
        }
    }, [files])

    //traer archivos segun el id del especialista

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const handleUpload = async(e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append("image", files)
        await axios.post(`${process.env.REACT_APP_API_URL}/files`, {formData: formData, id: user.id, nombre: user.nombre, apellido: user.apellido }, { headers: {'Content-Type': 'multipart/form-data'}})
    }
  return (
    <>
    
    <Box sx={{ width: '100%' }}>
            <input 
            ref={hiddenFileInput}
            id="upload-file"
            name="upload-file"
            style={{ display: 'none' }} 
            onChange={fileSelected} 
            type="file" />
           
            <Card sx={{ width: "100%", height: 160 }}>
                <Box sx={{height: "100%",display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center", rowGap: 1}}>
                   
                        
                    <CloudUploadIcon onClick={handleClick} type="submit" sx={{fontSize: 80, color: "#163172", cursor: "pointer"}}/>
                    <Typography sx={{
                      fontFamily: "monospace",
                      fontWeight: 400,
                      fontSize: 14,
                      color: "black",
                      textDecoration: "none",
                    }}>{ files?.name?.slice(0,45) || "Subir Archivo" }</Typography>
                    <Box sx={{width: "100%", display: "flex", justifyContent: "end", mr: 2}}>
                        <Button onClick={handleUpload} disabled={isValid} sx={{ backgroundColor: "#163172",
            color: "white",
            "&:hover": {
              backgroundColor: "#1d4197",
              transition: "0.4s",
            },
            "&:disabled": {
              background: "#cfcfcf",
            },}} variant="contained"  size="small">Subir</Button>
                    </Box>
                    
                </Box>
        
            </Card>
            
      </Box>      
        
         <Grid sx={{mt: 3, backgroundColor: "white", boxShadow: 2, height: "23rem", overflow: "auto", padding: 3}} container columnSpacing={1.5} rowSpacing={1.5}>
    
            <Grid item md={2} xs={6}>
                    <Card sx={{width: "100%", height: 130 }}>
                        <Box sx={{height: "100%",display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center"}}>
                            <Box sx={{width: "100%", display: "flex", justifyContent: "end", mr: 2}}>
                                <CloseIcon  sx={{fontSize: 16, color: "#163172", cursor:  "pointer"}} />
                                
                            </Box>
                            
                            <InsertDriveFileIcon sx={{ fontSize: 80, color: "#163172" }}/> 
                            <Typography sx={{fontSize: 13, color: "#163172"}}>Añadir Archivo</Typography> 
                        </Box>
                
                    </Card>
            </Grid>  
        </Grid>
    
    </>
  )
}
