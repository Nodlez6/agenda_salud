import { BarChart,Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React, { useContext, useEffect } from 'react'
import axios from 'axios';
import { AuthContext } from '../../auth/authContext';
import { Card, Container, Typography } from '@mui/material';

export const StatisticsPacient = () => {
  const { user } = useContext(AuthContext);
  const [dataCountDate, setDataCountDate] = React.useState([]);
  useEffect(() => {
    let isMounted = true;
    axios
      .get(`${process.env.REACT_APP_API_URL}/statistics/pacient/${user.id}`)
      .then(function (response) {
        if (isMounted) {
          setDataCountDate(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => {
      isMounted = false;
    };
  }, []);


  return (
    <Container>
     

          <Card sx={{width: "100%", height:350, mt:4, padding: 3}}>
      <Typography sx={{
                      fontFamily: "monospace",
                      fontWeight: 400,
                      fontSize: 14,
                      color: "black",
                      textDecoration: "none",
                      textAlign: "center",
                    }}>Cantidad de citas por paciente</Typography>
                    <ResponsiveContainer>
                      <BarChart
                        
                            data={dataCountDate}
                            
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="usuario" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="cantidad" fill="#163172" />
                          </BarChart>
              </ResponsiveContainer>
          </Card>
      </Container>
  )
}
