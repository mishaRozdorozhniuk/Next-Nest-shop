'use client';

import { Box, Button, Modal, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { FormResponse } from '../common/interfaces/form-response.interface';
import createProduct from './create-products';

const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface CreateProductModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function CreateProductModal({ open, handleClose }: CreateProductModalProps) {
  const [response, setResponse] = useState<FormResponse>();

  async function handleCreateProduct(formData: FormData) {
    const response = await createProduct(formData);
    setResponse(response);

    if (!response?.error) {
      onClose();
    }
  }

  const onClose = () => {
    setResponse(undefined);
    handleClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles}>
        <form className='w-full max-w-xs' action={handleCreateProduct}>
          <Stack spacing={2}>
            <TextField
              name='name'
              label='Name'
              variant='outlined'
              required
              error={!!response?.error}
              helperText={response?.error}
            />
            <TextField
              name='description'
              label='Description'
              variant='outlined'
              required
              error={!!response?.error}
              helperText={response?.error}
            />
            <TextField
              name='price'
              label='Price'
              variant='outlined'
              required
              error={!!response?.error}
              helperText={response?.error}
            />
            <Button type='submit' variant='contained'>
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
