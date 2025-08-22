import Link from 'next/link';
import styles from './page.module.css';
import Banner from './components/home/Banner';
import Category from './components/home/category';
import BestsellingWrapper from './components/home/BestsellingWrapper';
import About from './components/home/About';
import MilestoneBar from './components/home/milestone';
import Menu from './components/home/Menu';
import Team from './components/home/Team';
import Social from './components/home/Social';
import FeaturedCakeCTA from './components/home/cta';
import { Metadata } from 'next';
export const metadata = {
  title: "Homemade Cakes in Tenkasi | Serle’s Bake – Custom Birthday & Brownies",
  description: "Looking for a cake shop near me? Serle’s Bake delivers fresh homemade cakes, brownies, and custom designs across Tenkasi with free personalization.",
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
        <BestsellingWrapper /> 
        <Team />
        <FeaturedCakeCTA />
        <Social />
      </main>
    </div>
  );
}
