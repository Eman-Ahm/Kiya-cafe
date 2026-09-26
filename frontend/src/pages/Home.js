import SpecialsBanner from '../components/SpecialsBanner';
import Hero from '../components/Hero';
import MenuSection from '../components/MenuSection';
import Recommendations from '../components/Recommendations';
import AboutSection from '../components/AboutSection';
import BookTableSection from '../components/BookTableSection';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

function Home() {
  return (
    <div>
      <SpecialsBanner />
      <div id="home">
        <Hero />
      </div>
      <MenuSection />
      <Recommendations />
      <AboutSection />
      <BookTableSection />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default Home;
