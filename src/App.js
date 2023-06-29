import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'
import Home from './components/Home'
import ThemeContext from './Context'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/LoginForm'
import videoData from './components/VideoData'
import NotFound from './components/NotFound'
import Gaming from './components/Gaming'
import './App.css'
import TrendingRoute from './components/TrendingRoute'
import SavedVideos from './components/SavedVideos'

// Replace your code here
class App extends Component {
  state = {
    isDarkTheme: false,
    savedVideos: [],
  }

  toggleTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  updateSavedVideos = video => {
    this.setState(prev => ({savedVideos: [...prev.savedVideos, video]}))
  }

  render() {
    const {isDarkTheme, savedVideos} = this.state
    return (
      <ThemeContext.Provider
        value={{
          isDarkTheme,
          toggleTheme: this.toggleTheme,
          savedVideos,
          addVideo: this.updateSavedVideos,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/videos/:id" component={videoData} />
          <ProtectedRoute exact path="/trending" component={TrendingRoute} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route component={NotFound} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
