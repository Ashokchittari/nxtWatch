import {Link} from 'react-router-dom'
import Context from '../../Context'
import './index.css'

const GameVideo = props => (
  <Context.Consumer>
    {value => {
      const {isDarkTheme} = value
      const {videoData} = props
      const {id, thumbnailUrl, title, viewCount} = videoData
      const background = isDarkTheme ? 'dark' : 'light'

      return (
        <Link to={`/videos/${id}`} className="list-item">
          <li className={`list-item ${background}`}>
            <img
              src={thumbnailUrl}
              className="thumbnail"
              alt="video thumbnail"
            />
            <div className="video-data-container">
              <div>
                <p>{title}</p>

                <p>{viewCount} views</p>
              </div>
            </div>
          </li>
        </Link>
      )
    }}
  </Context.Consumer>
)

export default GameVideo
