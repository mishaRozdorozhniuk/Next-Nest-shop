'use server';

import { POST } from '@/app/util/fetch';
import { redirect } from 'next/navigation';

export default async function createUser(_prevState: any, formData: FormData) {
  const { error } = await POST('users', formData);

  if (error) {
    return {
      error,
    };
  }

  redirect('/');
}
