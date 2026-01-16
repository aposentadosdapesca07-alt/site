import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import Features from './components/Features';
import SocialProof from './components/SocialProof';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Spots from './components/Spots';
import Guides from './components/Guides';
import Videos from './components/Videos';
import News from './components/News';
import AboutUs from './components/AboutUs';
import BateuBonitoGallery from './components/BateuBonitoGallery';
import Contact from './components/Contact';
import SpotDetails from './components/SpotDetails';
import { ContentProvider } from './context/ContentContext';
import AdminControls from './components/AdminControls';
import AdSpace from './components/AdSpace';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen custom-page-bg text-gray-200 font-sans selection:bg-fishing-neon selection:text-black">

      <Header />

      <main>
        <div id="home">
          <Hero />
        </div>

        <div className="container mx-auto px-6">
          <AdSpace />
        </div>

        <AboutUs />
        <PainPoints />
        <Features />

        <Spots />

        <div className="container mx-auto px-6">
          <AdSpace label="Patrocinado" />
        </div>

        <BateuBonitoGallery />
        <Guides />
        <Videos />
        <News />

        <div className="container mx-auto px-6">
          <AdSpace />
        </div>

        <SocialProof />
        <FAQ />
        <Contact />

      </main>

      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ContentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/spot/:id" element={<SpotDetails />} />
        </Routes>
        <AdminControls />
      </BrowserRouter>
    </ContentProvider>
  );
};

export default App;