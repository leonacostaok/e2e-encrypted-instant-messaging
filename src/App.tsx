import * as React from 'react'
import {useContext, useEffect} from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom'
import LayoutPrimary from './layout/LayoutPrimary'
import Chat from './pages/Chat'
import Login from './pages/Login'
import {userProviderContext} from './providers/UserProvider'
import NotFound from "./pages/NotFound";
import LayoutWithLogin from "./layout/LayoutWithLogin";

const App = () => {
    //const [darkMode, setDarkMode] = useState(Boolean(localStorage.getItem('darkMode')))
    const {client, isBackupConfirmed} = useContext(userProviderContext)
    const navigate = useNavigate()
    // const changeTheme = () => {
    //   localStorage.setItem('darkMode', darkMode ? 'false' : 'true')
    //   setDarkMode(!darkMode)
    // }
    useEffect(() => {
        console.log('keys', client)
        if (client && isBackupConfirmed) {
            navigate('/chat')
        } else {
            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client, isBackupConfirmed])

    return (
        <React.Fragment>
            <Routes>
                <Route element={<LayoutPrimary/>} path={'/'}>
                    <Route index element={<Login/>}/>
                </Route>
                <Route element={<LayoutWithLogin/>} path={'/chat'}>
                    <Route index element={<Chat/>}/>
                    <Route path={':alias'} element={<Chat/>}/>
                </Route>
                <Route element={<LayoutPrimary/>} path={'*'}>
                    <Route index element={<NotFound/>}/>
                </Route>
            </Routes>
        </React.Fragment>
    )
}

export default App
