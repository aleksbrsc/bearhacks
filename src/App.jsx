import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Home from "@pages/Home";
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from 'sonner'
import './index.css'

function App() {
  return (
    <>
      <Analytics/>
      <BrowserRouter>
        <Toaster
          toastOptions={{
            className: "toast",
          }}
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;