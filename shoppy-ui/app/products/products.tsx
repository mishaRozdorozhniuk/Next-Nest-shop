import React from 'react';
import getProducts from './actions/get-product';
import Product from './product';

export default async function Products() {
  const products = await getProducts();

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {products?.map((product: any) => (
        <div key={product.id} className='h-full'>
          <Product product={product} />
        </div>
      ))}
    </div>
  );
}
