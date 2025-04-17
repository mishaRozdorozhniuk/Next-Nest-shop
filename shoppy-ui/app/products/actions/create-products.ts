'use server';

import { revalidateTag } from 'next/cache';
import { POST } from '../../common/util/fetch';

export default async function createProduct(formData: FormData) {
  const response = await POST('products', formData);
  revalidateTag('products');

  return response
}
