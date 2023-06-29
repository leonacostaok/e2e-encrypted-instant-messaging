import * as React from 'react'
import { useContext, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import LayoutPrimary from './layout/LayoutPrimary/LayoutPrimary'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import { userProviderContext } from './providers/UserProvider'
import NotFoundPage from "./pages/NotFoundPage";
import LayoutWithLogin from "./layout/LayoutWithLogin";
const RouteWithLayout = ({ component: Component, layout: Layout,rest }: any) => (
  <Route
    {...rest}
    render={(props:any) => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
)
const App = () => {
  //const [darkMode, setDarkMode] = useState(Boolean(localStorage.getItem('darkMode')))
  const { keyPair, isBackupConfirmed } = useContext(userProviderContext)
  const history = useHistory()
  // const changeTheme = () => {
  //   localStorage.setItem('darkMode', darkMode ? 'false' : 'true')
  //   setDarkMode(!darkMode)
  // }
  useEffect(() => {
    if (keyPair && isBackupConfirmed) {
      history.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyPair, isBackupConfirmed])
  return (
    <React.Fragment>
      <Switch>
        <RouteWithLayout layout={LayoutPrimary} path={'/login'} exact component={LoginPage} />
        <RouteWithLayout layout={LayoutWithLogin} path={'/'} exact component={ChatPage} />
        <RouteWithLayout layout={LayoutWithLogin} path={'/:alias'} exact component={ChatPage} />
        <RouteWithLayout layout={LayoutPrimary} path={'*'} exact component={NotFoundPage} />
      </Switch>
    </React.Fragment>
  )
}

export default App
