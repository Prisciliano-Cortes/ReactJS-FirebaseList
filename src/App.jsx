import { Routes, Route } from 'react-router-dom'
import { Login } from './routes/Login'
import { Home } from './routes/Home'
import { Navbar } from './components/Navbar'
import { Register } from './routes/Register'
import { RequireAuth } from './components/RequireAuth'
import { useContext } from 'react'
import { UserContext } from './context/UserProvider'
import { LayoutContainerForm } from './components/LayoutContainerForm'
import { NotFound } from './routes/NotFound'
import { LayoutRedirect } from './components/LayoutRedirect'

function App() {

    const { user } = useContext(UserContext)

    if (user === false) {
        return <p>Loading...</p>
    }

    return (
        <>
            <Navbar />

            <Routes>
                <Route
                    path="/"
                    element={<RequireAuth />}
                >
                    <Route
                        index
                        element={<Home />}
                    />
                </Route>

                <Route path='/' element={ <LayoutContainerForm />}>
                    <Route path='/login' element={ <Login /> } />
                    <Route path='/register' element={ <Register /> } />
                </Route>

                <Route
                    path="/:nanoid"
                    element={<LayoutRedirect />}
                >
                    <Route
                        index
                        element={<NotFound />}
                    />
                </Route>
            </Routes>
        </>
    )
}

export default App
