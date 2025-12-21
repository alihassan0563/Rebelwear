import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Streetwear from './pages/Streetwear'
import Uniforms from './pages/Uniforms'
import Hoodies from './pages/Hoodies'
import Tshirts from './pages/Tshirts'
import Tracksuits from './pages/Tracksuits'
import Jackets from './pages/Jackets'
import Sweatshirts from './pages/Sweatshirts'
import Accessories from './pages/Accessories'
import BasketballUniforms from './pages/BasketballUniforms'
import FootballUniforms from './pages/FootballUniforms'
import SoccerUniforms from './pages/SoccerUniforms'
import BaseballUniforms from './pages/BaseballUniforms'
import HockeyUniforms from './pages/HockeyUniforms'
import BoxingUniforms from './pages/BoxingUniforms'
import About from './pages/About'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/streetwear" element={<Streetwear />} />
            <Route path="/uniforms" element={<Uniforms />} />
            <Route path="/hoodies" element={<Hoodies />} />
            <Route path="/tshirts" element={<Tshirts />} />
            <Route path="/tracksuits" element={<Tracksuits />} />
            <Route path="/jackets" element={<Jackets />} />
            <Route path="/sweatshirts" element={<Sweatshirts />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/basketball-uniforms" element={<BasketballUniforms />} />
            <Route path="/football-uniforms" element={<FootballUniforms />} />
            <Route path="/soccer-uniforms" element={<SoccerUniforms />} />
            <Route path="/baseball-uniforms" element={<BaseballUniforms />} />
            <Route path="/hockey-uniforms" element={<HockeyUniforms />} />
            <Route path="/boxing-uniforms" element={<BoxingUniforms />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App


