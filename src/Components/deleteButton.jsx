import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export default function IconLabelButtons() {
  return (
      <Button variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
  );
}
