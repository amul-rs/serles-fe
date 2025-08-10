import Link from 'next/link';
import styles from './page.module.css';
import Banner from './components/home/Banner';
import Category from './components/home/category';
import Bestselling from './components/home/Bestselling';
import About from './components/home/About';
import MilestoneBar from './components/home/milestone';
import Menu from './components/home/Menu';
import Team from './components/home/Team';
import Social from './components/home/Social';
import FeaturedCakeCTA from './components/home/cta';
import { Metadata } from 'next';
export const metadata = {
  title: "Serles Bake - Homemade Custom Cakes in Tenkasi",
  description: "Serles Bake - Your local homemade cake shop in Tenkasi. We specialize in custom cakes for birthdays, weddings, and special occasions. Order fresh, delicious cakes made with love.",
  keywords: "cake shop tenkasi, custom cakes, birthday cakes, wedding cakes, homemade cakes, bakery tenkasi, custom cake design, celebration cakes",
};
  export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Category />
        <Banner />
        <About />
        <MilestoneBar />
        <Menu />
        <Bestselling /> 
        <Team />
        <FeaturedCakeCTA />
        <Social />
      </main>
    </div>
  );
}
