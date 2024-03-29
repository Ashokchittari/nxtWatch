import {Link} from 'react-router-dom'
import Context from '../../Context'
import './index.css'

const VideoItem = props => (
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
            <img
              src={thumbnailUrl}
              className="thumbnail"
              alt="video thumbnail"
            />
            <div className="video-data-container">
              <div>
                <img
                  className="channel-img"
                  src={channel.profile_image_url}
                  alt="channel logo"
                />
              </div>
              <div>
                <p>{title}</p>
                <p>{channel.name}</p>
                <div>
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

export default VideoItem
