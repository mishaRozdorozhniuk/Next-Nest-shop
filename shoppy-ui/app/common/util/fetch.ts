import { cookies } from 'next/headers';
import { API_URL } from '../constants/api';
import { getErrorMessage } from './errors';

const getHeaders = async () => {
  const cookieStore = await cookies();
  return {
    Cookie: cookieStore.toString(),
  };
};

export const POST = async (url: string, body: FormData) => {
  console.log('body', body);

  const formObject = Object.fromEntries(body.entries());

  const res = await fetch(`${API_URL}/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(await getHeaders()),
    },
    body: JSON.stringify(formObject),
  });

  const parsedRes = await res.json();
  console.log('parsedRes', parsedRes);

  if (!res.ok) {
    return {
      error: getErrorMessage(parsedRes),
    };
  }

  return { error: '' };
};

export const GET = async (url: string) => {
  const res = await fetch(`${API_URL}/${url}`, {
    method: 'GET',
    headers: {
      ...(await getHeaders()),
    },
  });

  return res.json();
};
