import { Route, Routes } from 'react-router-dom'
import { Index } from './pages/Index'

import { Header } from './components/Header/Header'
import { Registro } from './pages/Registro/Registro'
import { PersonalComparado } from './pages/PersonalComparado/PersonalComparado'
import { UsersContextProvider } from './context/users.context'

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

      <Route path='/personal' element={
        <>
          <Header />
          <UsersContextProvider>
            <PersonalComparado />
          </UsersContextProvider>
        </>
      } />
    </Routes>
  )
}

export default App
