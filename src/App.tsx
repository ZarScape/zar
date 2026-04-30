import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Store from './pages/Store'
import Partners from './pages/Partners'
import Privacy from './pages/Privacy'
import Tos from './pages/Tos'
import SuccessOrder from './pages/SuccessOrder'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router basename="/zar" future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="relative min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/tos" element={<Tos />} />
          <Route path="/success" element={<SuccessOrder />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
