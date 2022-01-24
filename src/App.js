import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import './App.css'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import { useContext } from 'react'
import NotFound from './pages/notFound/NotFound'
import Messenger from './pages/messenger/Messenger'
function App() {
	const { user } = useContext(AuthContext)
	return (
		<Router>
			<Routes>
				<Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
				<Route
					path="/register"
					element={user ? <Navigate to="/" /> : <Register />}
				/>
				<Route
					path="/messenger"
					element={!user ? <Navigate to="/" /> : <Messenger />}
				/>
				<Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
				<Route
					path="/profile/:username"
					element={user ? <Profile /> : <Login />}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	)
}

export default App
