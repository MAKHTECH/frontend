import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Pricing from './components/Pricing/Pricing';
import About from './components/About/About';
import Support from './components/Support/Support';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <About />
        <Support />
      </main>
    </div>
  );
}

export default App;
