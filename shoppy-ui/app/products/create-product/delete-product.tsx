"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import deleteProduct from '../actions/delete-product';

export default function DeleteProduct({ productId }: { productId: number }) {
  const router = useRouter();

  const handleDeleteProduct = async () => {
    try {
      const response = await deleteProduct(productId);

      if (response?.error) {
        console.error('Failed to delete product:', response.error);
      } else {
        console.log('Product deleted successfully');
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <button className='text-black' onClick={handleDeleteProduct}>
      delete-product
    </button>
  );
}
