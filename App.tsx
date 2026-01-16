import Header from './Header';
import Hero from './Hero';
import PainPoints from './PainPoints';
import Features from './Features';
import SocialProof from './SocialProof';
import FAQ from './FAQ';
import Footer from './Footer';
import { ContentProvider } from './context/ContentContext';

function App() {
  return (
    <ContentProvider>
      <div className='min-h-screen bg-slate-900 text-white'>
        <Header />
        <main>
          <Hero />
          <PainPoints />
          <Features />
          <SocialProof />
          <FAQ />
        </main>
        <Footer />
      </div>
    </ContentProvider>
  );
}

export default App;

