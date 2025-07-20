
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { Toaster } from "react-hot-toast";

import Router from './Router'

function App() {

  return (
  <>
   <BrowserRouter>
      <Router />
      <Toaster />
    </BrowserRouter>

  </>
  )
}

export default App
