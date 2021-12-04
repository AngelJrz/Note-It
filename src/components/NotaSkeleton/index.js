import React from 'react';
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";

export default function NotaSkeleton() {
    return (
      <Card sx={{ maxWidth: 250, minHeight: 300, margin: 1 }}>
        <Skeleton variant="rectangular" width={250} height={118} />
        <Skeleton variant="text" width={100} />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width={150} />
        <Skeleton variant="text" width={130} />
        <Skeleton variant="rectangular" width={60} height={30} style={{ marginTop: 30, marginRight: 10, marginLeft: 'auto'}}/>
      </Card>
    );
}
