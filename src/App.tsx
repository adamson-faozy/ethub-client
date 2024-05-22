import { ChakraProvider } from '@chakra-ui/react'
import { theme } from "./chakra/theme.js"
import Login from "./components/Login/index"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthProtector from './auth/AuthProtector'
import Home from './components/home/Home'
import Layout from './components/Layout'
import { AuthProvider, useAuth } from './auth/protected/AuthProvider'
function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="login" element={<Login />} />
              <Route element={<AuthProtector />}>
                <Route path="/" element={<Home />}></Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  )
}
export default App;
