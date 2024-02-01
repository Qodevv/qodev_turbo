import { Grid, Typography } from '@mui/material';
import Image from 'next/image';



export function Footer() {
  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80px"
      paddingX={4}
    >
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        justifyContent={['center', , 'start']}
        alignItems="center"
      >
        {/* qodev image here */}
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        justifyContent={['center', , 'end']}
        alignItems="center"
      >
        <Typography textAlign="end" fontSize="12px">
          © 2024 Qodev. All rights reserved.
        </Typography>
      </Grid>
    </Grid>
  );
}