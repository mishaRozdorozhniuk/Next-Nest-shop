interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

interface ProductProps {
  product: IProduct;
}

export default function Product({ product }: ProductProps) {
  return (
    <div className='flex flex-col overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-all duration-300'>
      <div className='p-6 flex flex-col flex-grow'>
        <h2 className='text-xl font-bold text-gray-800 mb-2'>{product.name}</h2>
        <p className='text-gray-600 mb-4 flex-grow'>{product.description}</p>
        <div className='flex items-center justify-between'>
          <span className='text-xl font-bold text-indigo-600'>${product.price.toFixed(2)}</span>
        </div>
        <button className='px-4 py-2 mt-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors'>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
