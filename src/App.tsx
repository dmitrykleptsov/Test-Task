import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ProjectPage from './components/ProjectPage/ProjectPage'
import { ROUTES } from './constants/routes'
import styles from './styles.module.scss'
import './App.style.scss'


export default function App() {

	return (
    	<Router>
      		<div className={styles.header_navbar}>
        		<Header />
        		<div className={styles.page}>
          		<Navbar />
          		<Routes>
            		<Route path={ROUTES.VIEW} element={<ProjectPage />} />
            		<Route path={ROUTES.MANAGE} element={<div />} />
          		</Routes>
        		</div>
      		</div>
    	</Router>
 	)
}