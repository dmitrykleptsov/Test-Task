import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import ProjectPage from './components/ProjectPage/ProjectPage'

import styles from './styles.module.scss'

export function App() {
    return (
        <div className={styles.header_navbar}>
            <Header />
            <Navbar />
            <div className={styles.main_page}>
                <ProjectPage />
            </div>
        </div>
    )
}