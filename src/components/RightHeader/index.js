import {AiFillHome, AiFillFire, AiFillSave} from 'react-icons/ai'
import {IoLogoGameControllerB} from 'react-icons/io'
import {Link} from 'react-router-dom'
import Context from '../../Context'
import './index.css'

const RightHeader = () => (
  <Context.Consumer>
    {value => {
      const {isDarkTheme} = value
      const textColor = isDarkTheme ? 'dark' : 'light'
      return (
        <div className="left-container">
          <ul>
            <li>
              <Link to="/" className="link">
                <div className="icons-container">
                  <AiFillHome className={textColor} />
                  <p className={`text ${textColor}`}>Home</p>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/trending" className="link">
                <div className="icons-container">
                  <AiFillFire className={textColor} />
                  <p className={`text ${textColor}`}>Trending</p>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/gaming" className="link">
                <div className="icons-container">
                  <IoLogoGameControllerB className={textColor} />
                  <p className={`text ${textColor}`}>Gaming</p>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/saved-videos" className="link">
                <div className="icons-container">
                  <AiFillSave className={textColor} />
                  <p className={`text ${textColor}`}>Saved videos</p>
                </div>
              </Link>
            </li>
          </ul>
          <div>
            <p>CONTACT US</p>
            <ul>
              <li>
                <button type="button">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                  />
                </button>
              </li>
              <li>
                <button type="button">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                  />
                </button>
              </li>
              <li>
                <button type="button">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                  />
                </button>
              </li>
            </ul>
            <p>Enjoy! Now to see your channels and recommendations!</p>
          </div>
        </div>
      )
    }}
  </Context.Consumer>
)

export default RightHeader
