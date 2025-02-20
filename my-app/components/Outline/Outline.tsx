import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import '@/app/styles/global.css';
import 'app/globals.css';

const Outline = ({ children }: any) => {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
};

export default Outline;
