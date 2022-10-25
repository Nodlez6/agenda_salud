import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";

export const PatientsScreen = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [patients, setPatients] = useState([]);
  console.log(id);
 // /pacientes/:idEspecialidad
  useEffect(() => {
    let isMounted = true;
    console.log(user);
    axios
      .get(`${process.env.REACT_APP_API_URL}/specialists/pacientes/${id}`)
      .then(function (response) {
        if(isMounted){
          const data = []
          response.data.forEach((element) => {
            data.push(element.usuarios)
          });
          const setData = new Set(data);
          setPatients(setData);
        console.log(patients);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => {
      isMounted = false;
    }
  }, []);


  return <div>PatientsScreen</div>;
};
