import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import MainPackage from '@/components/main_package';
import BookingProcess from '@/components/booking_process';
import AboutGradframe from '@/components/about_gradframe';
import Testimonios from '@/components/testimonios';
import FAQ from '@/components/f_a_q';
import Location from '@/components/location';
import Footer from '@/components/footer';

import { motion } from 'framer-motion';

const Index = () => (
  <div className="overflow-x-hidden">
    <Navbar />
    <Hero />
    <MainPackage />
    
    <BookingProcess />

    {/* Foto Muestra 2 (Panorámica de Extremo a Extremo) */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full mt-12 mb-4 shadow-2xl overflow-hidden h-[20vh] sm:h-[25vh] md:h-[35vh] lg:h-[40vh] max-h-[450px]"
    >
      <img 
        src="/2.jpeg" 
        alt="Muestra de fotografía de graduación 2" 
        className="w-full h-full object-cover object-[center_60%] hover:scale-105 transition-transform duration-1000" 
      />
    </motion.div>
    
    <FAQ />
    <Location />
    
    <AboutGradframe />
    <Testimonios />
    <Footer />
  </div>
);

export default Index;
