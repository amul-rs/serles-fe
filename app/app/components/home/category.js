import Link from 'next/link';
import Image from 'next/image';
import { getCategoriesUrl } from '../../config/api';
import './productgrid.scss';

async function fetchCategories() {
  const res = await fetch(getCategoriesUrl());
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  const categoriesData = await res.json();
  return categoriesData.results;
}

export default async function Category() {
  const categoriesData = await fetchCategories();
  return (
    <section className="container text-center">
      <h2 className='h2'>Baked Fresh, Delivered Fresh</h2>
      <p className='p'>From our oven to your heart</p>
      <div className="product_grid">
        {categoriesData.map((category) => (
          <div className="product_grid_item" key={category.id}>
            <Link href={`/shop/${category.slug}`}>
              <Image src={category.image || '/img/shop/product-1.jpg'} alt={category.name} width={100} height={100} />
              <h6 className='h6'>{category.name}</h6>
            </Link>
          </div>
        ))}
      </div>

    </section>
  );
}