import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import ThemeContext from '../../Context'
import './index.css'
import 'reactjs-popup/dist/index.css'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme, toggleTheme} = value

      const onToggleTheme = () => {
        toggleTheme()
      }
      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }
      const themeImageURL = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/dark-theme-img.png'

      const websiteLogo = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      const navbarBgClassName = isDarkTheme
        ? 'navbar-bg-dark'
        : 'navbar-bg-light'

      return (
        <nav className={`nav-header ${navbarBgClassName}`}>
          <div className="nav-content">
            <div className="nav-bar-large-container">
              <Link to="/">
                <img
                  className="website-logo"
                  src={websiteLogo}
                  alt="website logo"
                />
              </Link>
              <div className="nav-menu">
                <button
                  data-testid="theme"
                  className="theme-button"
                  type="button"
                  onClick={onToggleTheme}
                >
                  <img
                    className="theme-image"
                    src={themeImageURL}
                    alt="theme"
                  />
                </button>
                <button type="button" className="user-btn">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    className="user-icon"
                    alt="profile"
                  />
                </button>
                <Popup
                  trigger={
                    <button type="button" className="logout-desktop-btn">
                      Logout
                    </button>
                  }
                >
                  {close => (
                    <div>
                      <p>Are you sure, you want to logout</p>
                      <div>
                        <button type="button" onClick={() => close()}>
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="logout-desktop-btn"
                          onClick={onClickLogout}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
          </div>
        </nav>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Header)
