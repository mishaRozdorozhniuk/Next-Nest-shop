'use client';

import Product from './product';
import IProduct from './interfaces/product.interface';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { API_URL } from '../common/constants/api';
import revalidateProducts from './actions/revalidate-products';

interface ProductGridProps {
  products: IProduct[];
}

export default function ProductsGrid({ products }: ProductGridProps) {
  useEffect(() => {
    const socket = io(API_URL!);

    socket.on('productUpdated', () => {
      revalidateProducts()
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {products?.map(product => (
        <div key={product.id} className='h-full'>
          <Product product={product} />
        </div>
      ))}
    </div>
  );
}
