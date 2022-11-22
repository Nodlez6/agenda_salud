import { BarChart,Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React, { useContext, useEffect } from 'react'
import axios from 'axios';
import { AuthContext } from '../../auth/authContext';
import { Card, Container, Grid, Typography } from '@mui/material';
import { StatisticsPacient } from './StatisticsPacient';


export const StatisticsScreen = () => {
  const { user } = useContext(AuthContext);
  const [dataCountDate, setDataCountDate] = React.useState([]);
  useEffect(() => {
    let isMounted = true;
    axios
      .get(`${process.env.REACT_APP_API_URL}/statistics/${user.id}`)
      .then(function (response) {
        if (isMounted) {
          console.log(response.data);
          const data = response.data.map((item) => {
            return {
              fecha: item.fecha.split("T")[0],
              Cantidad: item._count.fecha,
            }
          }
          )
          setDataCountDate(data);
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{width: "100%", height:350, mt:4, padding: 3}}>
                      <Typography sx={{
                        fontFamily: "monospace",
                        fontWeight: 400,
                        fontSize: 14,
                        color: "black",
                        textDecoration: "none",
                        textAlign: "center",
                      }}>Cantidad de citas en el dia</Typography>
                        <ResponsiveContainer>
                          <BarChart
                          
                            data={dataCountDate}
                            
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="fecha" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Cantidad" fill="#163172" />
                        </BarChart>
                        </ResponsiveContainer>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          
            <StatisticsPacient />
     
        </Grid>
      </Grid>
        

         
      </Container>
  )
}
