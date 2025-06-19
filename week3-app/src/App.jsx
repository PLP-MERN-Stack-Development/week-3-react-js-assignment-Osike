import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import MainLayout from './Layouts/MainLayout'
import HomePage from './pages/HomePage'
import TaskManagerPage from './components/TaskManager'
import ApiDataPage from './pages/ApiDataPage'

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tasks" element={<TaskManagerPage />} />
            <Route path="/api-data" element={<ApiDataPage />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  )
}

export default App