import {Link} from 'react-router-dom'
import Context from '../../Context'
import './index.css'

const TrendingVideoItem = props => (
  <Context.Consumer>
    {value => {
      const {isDarkTheme} = value
      const {videoData} = props
      const {
        channel,
        id,
        publishedAt,
        thumbnailUrl,
        title,
        viewCount,
      } = videoData
      const background = isDarkTheme ? 'dark' : 'light'

      return (
        <li className={`list-item ${background}`}>
          <Link to={`/videos/${id}`} className={background}>
            <div className="video-item">
              <img
                src={thumbnailUrl}
                className="thumbnail"
                alt="video thumbnail"
              />
              <div className="video-data-container">
                <p>{title}</p>
                <p>{channel.name}</p>
                <div className="video-data">
                  <p>{viewCount} views</p>
                  <p>{publishedAt}</p>
                </div>
              </div>
            </div>
          </Link>
        </li>
      )
    }}
  </Context.Consumer>
)

export default TrendingVideoItem
