import { BarChart,Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
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
          console.log(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => {
      isMounted = false;
    };
  }, []);
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <Container>
     

          <Card sx={{width: 540, height:350, mt:4, padding: 1}}>
      <Typography sx={{
                      fontFamily: "monospace",
                      fontWeight: 400,
                      fontSize: 14,
                      color: "black",
                      textDecoration: "none",
                      textAlign: "center",
                    }}>Cantidad de citas en el dia</Typography>
        <BarChart
              width={500}
              height={300}
              data={dataCountDate}
              
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Cantidad" fill="#163172" />
            </BarChart>
          </Card>
      </Container>
  )
}
