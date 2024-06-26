import { Box, Button, Card, CircularProgress, Grid, Link, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { ConfirmPopUp } from '../mui/ConfirmPopUp';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';


export const UploadFilePacient = ({user, idPaciente}) => {
    const [files, setFile] = React.useState([])
    const [filesArray, setFilesArray] = React.useState([])
    const hiddenFileInput = React.useRef(null);
    const [isValid, setIsValid] = React.useState(true)
    const [spinner, setSpinner] = React.useState(false);
    const [spinner2, setSpinner2] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);
    const [openConfirm, setOpenConfirm] = React.useState(false);
    const [titleConfirm, setTitleConfirm] = React.useState("");
    const [textConfirm, setTextConfirm] = React.useState("");
    const [oneFile, setoneFile] = React.useState(null);	
    
    const notifyError = () =>
    toast.error("No se ha podido subir el archivo", {
      position: toast.POSITION.TOP_CENTER,
    });

  const notifySuccess = () =>
    toast.success("Se ha subido el archivo", {
      position: toast.POSITION.TOP_CENTER,
    });

    const notifyErrorDelete = () =>
    toast.error("No se ha podido eliminar el archivo", {
      position: toast.POSITION.TOP_CENTER,
    });

    const notifySuccessDelete = () =>
    toast.success("Se ha eliminado el archivo", {
      position: toast.POSITION.TOP_CENTER,
    });

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


      useEffect(() => {
        let isMounted = true;
        setSpinner2(true);
        axios
            .get(`${process.env.REACT_APP_API_URL}/userfile/${user.id}/${idPaciente}`)
            .then(function (response) {
                if (isMounted) {
                   setFilesArray(response.data)
                   console.log(response.data)
                    setSpinner2(false);
                }
            }
            )
            .catch(function (error) {
                console.log(error);
            }
            );
        return () => {
            isMounted = false;
        }
    }, [refresh])

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const handleUpload = async(e) => {
        e.preventDefault()

        setSpinner(true)
        setIsValid(true)
        setFile(null)
        const formData = new FormData();
        formData.append("image", files)
        await axios.post(`${process.env.REACT_APP_API_URL}/userfile`, formData,{params:{ spec_id: user.id, id: idPaciente }}, { headers: {'Content-Type': 'multipart/form-data'}})
        .then(function (response) {
            notifySuccess()
            setSpinner(false)
            setRefresh(!refresh)
        }
        )
        .catch(function (error) {
            notifyError()
            setSpinner(false)
        }
        );
    }

    const handleDelete = async() => {
        setOpenConfirm(false)
        await axios.post(`${process.env.REACT_APP_API_URL}/userfile/delete`, {id_bdd: oneFile.id, spec_id: user.id, nombre_archivo: oneFile.nombre_archivo, id: idPaciente})
        .then(function (response) {
            notifySuccessDelete()
        }
        )
        .catch(function (error) {
            notifyErrorDelete()
        }
        );
        const files_aux = []
        filesArray.forEach(file => {
            if(file.id !== oneFile){
                files_aux.push(file)
            }
        });
        setFilesArray(files_aux)
    }

    const handleChangeVisible = async(id, visible) => {
        await axios.post(`${process.env.REACT_APP_API_URL}/files/visible`, {id_bdd: id, visible: visible})
        .then(function (response) {
            notifySuccessDelete()
        }
        )
        .catch(function (error) {
            notifyErrorDelete()
        }
        );
    }


    const handleOpenConfirm = (file) => {
        setOpenConfirm(true)
        setTitleConfirm("Eliminar archivo")
        setTextConfirm("¿Está seguro que desea eliminar el archivo?")
        setoneFile(file)
    }
  return (
    <div>
        <ToastContainer />
     <ConfirmPopUp
            open={openConfirm}
            setOpen={setOpenConfirm}
            title={titleConfirm}
            content={textConfirm}
            handleConfirm={handleDelete}
          />
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
                   
                        {spinner ? (<Box sx={{display: "flex", justifyContent: "center", alignContent: "center" }}>
          <CircularProgress size={"1.9rem"} />
        </Box>) : (<><CloudUploadIcon onClick={handleClick} type="submit" sx={{fontSize: 80, color: "#163172", cursor: "pointer"}}/>
                    <Typography sx={{
                      fontFamily: "monospace",
                      fontWeight: 400,
                      fontSize: 14,
                      color: "black",
                      textDecoration: "none",
                    }}>{ files?.name?.slice(0,45) || "Subir Archivo" }</Typography></>)}
                    
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
            {spinner2 ? (<Box sx={{display: "flex", justifyContent: "center", alignContent: "center" }}>
            <CircularProgress size={"1.9rem"} />
            </Box>) : (filesArray.map((file) => (
                
            <Grid key={file.id} item md={2} xs={6}>
                    <Card sx={{width: "100%", height: 130 }}>
                        <Box sx={{height: "100%",display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center"}}>
                            <Box sx={{width: "100%", display: "flex", justifyContent: "end", mr: 2, alignItems: "center"}}>
        
                                <CloseIcon onClick={ () => handleOpenConfirm(file)}  sx={{fontSize: 16, color: "#163172", cursor:  "pointer"}} />
                                
                            </Box>
                            
                            
                            
                            <InsertDriveFileIcon sx={{ fontSize: 80, color: "#163172" }}/> 
                            <Link href={file.url} >{file.nombre_archivo.slice(0,21)}{(file.nombre_archivo.length > 21 && "..." )}</Link> 
                        </Box>
                
                    </Card>
            </Grid>   )))}
        </Grid>
    </div>
  )
}
