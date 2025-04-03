import { API_URL } from '../constants/api';
import { getErrorMessage } from './errors';

export const POST = async (url: string, body: FormData) => {
  const res = await fetch(`${API_URL}/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Object.entries(body)),
  });

  const parsedRes = await res.json();

  if (!res.ok) {
    return {
      error: getErrorMessage(parsedRes),
    };
  }

  return { error: '' };
};
