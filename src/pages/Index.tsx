import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import MainPackage from '@/components/main_package';
import Addons from '@/components/addons';
import SpecialServices from '@/components/special_services';
import BookingProcess from '@/components/booking_process';
import Testimonios from '@/components/testimonios';
import FAQ from '@/components/f_a_q';
import Location from '@/components/location';
import Footer from '@/components/footer';

const Index = () => (
  <>
    <Navbar />
    <Hero />
    <MainPackage />
    <Addons />
    <SpecialServices />
    <BookingProcess />
    <Testimonios />
    <FAQ />
    <Location />
    <Footer />
  </>
);

export default Index;
