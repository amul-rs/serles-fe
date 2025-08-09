import Link from 'next/link';
import styles from './page.module.css';
import Banner from './components/home/Banner';
import Category from './components/home/category';
import Bestselling from './components/home/Bestselling';
export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Category />
        <Banner />
        <Bestselling />
      </main>
    </div>
  );
}
