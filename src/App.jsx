import { Route, Routes } from 'react-router-dom'
import { Index } from './pages/Index'

import { Header } from './components/Header/Header'
import { Registro } from './pages/Registro/Registro'

// import "../ES6Promise.js"

function App() {

  return (
    <Routes>
      <Route path='/' element={
        <>
          <Header />
          <Index />
        </>
      }/>

      <Route path='/registro' element={
        <>
          <Header />
          <Registro />
        </>
      }/>
    </Routes>
  )
}

export default App
