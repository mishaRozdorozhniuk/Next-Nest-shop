'use client';

import { Button, Stack, TextField, Link, Box } from '@mui/material';
import NextLink from 'next/link';
import createUser from './create-user';
import { useActionState } from 'react';

export default function SignUp() {
  const [state, formAction] = useActionState(createUser, { error: '' });

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 4 }}>
      <form action={formAction} style={{ width: '100%', maxWidth: '400px' }}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            helperText={state.error}
            error={!!state.error}
            name='email'
            label='Email'
            variant='outlined'
            type='email'
          />
          <TextField
            fullWidth
            helperText={state.error}
            error={!!state.error}
            name='password'
            label='Password'
            variant='outlined'
            type='password'
          />
          <Button type='submit' variant='contained' color='primary' size='large' sx={{ py: 1.5 }}>
            Sign Up
          </Button>
          <Link
            component={NextLink}
            href='/auth/login'
            sx={{
              textAlign: 'center',
              display: 'block',
              mt: 2,
            }}
          >
            Already have an account? Login
          </Link>
        </Stack>
      </form>
    </Box>
  );
}
