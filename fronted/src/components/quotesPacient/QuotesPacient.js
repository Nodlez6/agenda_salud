import { Box, CircularProgress, Container } from '@mui/material'
import QuotesTable from './QuotesTable'
import axios from "axios";
import { AuthContext } from '../../auth/authContext';
import { useContext, useEffect, useState } from 'react';

export const QuotesPacient = () => {
    
    
   
  return (
    <Container>
      <QuotesTable/>
        
        
    </Container>
  )
}
