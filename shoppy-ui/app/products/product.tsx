import Image from 'next/image';
import { API_URL } from '../common/constants/api';
import deleteProduct from './actions/delete-product';
import { revalidateTag } from 'next/cache';
import DeleteProduct from './create-product/delete-product';

interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  imageExists?: boolean;
}

interface ProductProps {
  product: IProduct;
}

export default function Product({ product }: ProductProps) {
  if (!product) return <div>Loading...</div>;

  // const handleDeleteProduct = async () => {
  //   const response = await deleteProduct(product.id);

  //   if (response.error) {
  //     console.error('Error deleting product:', response.error);
  //   } else {
  //     revalidateTag('products');
  //     console.log('Product deleted successfully');
  //   }
  // };

  return (
    <div className='flex flex-col overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-all duration-300'>
      <div className='p-6 flex flex-col flex-grow'>
        <h2 className='text-xl font-bold text-gray-800 mb-2'>{product.name}</h2>
        {product.imageExists && API_URL && (
          <Image
            src={`${API_URL}/products/${product.id}.jpg`}
            width={500}
            height={500}
            className='w-full h-auto'
            sizes='100vw'
            alt={`Picture of ${product.name}`}
          />
        )}
        <p className='text-gray-600 mb-4 flex-grow'>{product.description}</p>
        <div className='flex items-center justify-between'>
          <span className='text-xl font-bold text-indigo-600'>${product.price.toFixed(2)}</span>
        </div>
        <button className='px-4 py-2 mt-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors'>
          Add to Cart
        </button>
        {/* <button
          // onClick={handleDeleteProduct}
          className='px-4 py-2 mt-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors'
        >
          Delete
        </button> */}
        <DeleteProduct productId={product.id} />
      </div>
    </div>
  );
}
