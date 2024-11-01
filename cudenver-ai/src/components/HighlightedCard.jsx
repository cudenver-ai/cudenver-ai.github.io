import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function HighlightedCard() {


  return (
    <Box>
      <Typography variant="h6">Team Submission</Typography>
      <Typography sx={{ color: 'text.secondary', mb: 1 }}>
        Please make sure your type your team name correctly.
      </Typography>
      <TextField
        label="Team Name"
        required
        fullWidth
        disabled
      />

      <input
        type="file"
        accept=".pkl"
        style={{ display: 'block', marginBottom: '16px', marginTop: '16px' }}
        disabled
      />
      <Button
        variant="contained"
        size="Large"
        color="primary"
        endIcon={<ChevronRightRoundedIcon />}
        disabled
      >
        Upload
      </Button>
    </Box>
  );
}
