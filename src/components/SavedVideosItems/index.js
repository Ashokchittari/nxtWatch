import {Link} from 'react-router-dom'
import Context from '../../Context'

const SavedVideosItems = props => {
  const {videoData} = props
  return (
    <Context.Consumer>
      {value => {
        const {isDarkTheme, savedVideos} = value
        const {
          publishedAt,
          title,
          channel,
          id,
          thumbnailUrl,
          viewCount,
        } = videoData
        console.log(savedVideos.includes(videoData))
        return (
          <Link to={`/videos/${id}`} className="home-main-container">
            <div className="right-container">
              <img src={thumbnailUrl} alt="video thumbnail" />
            </div>
            <div>
              <h1>{title}</h1>
              <p>{channel.name}</p>
              <p>{viewCount}</p>
              <p>{publishedAt}</p>
            </div>
          </Link>
        )
      }}
    </Context.Consumer>
  )
}

export default SavedVideosItems
