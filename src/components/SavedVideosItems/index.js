import Context from '../../Context'

const SavedVideosItems = props => {
  const {videoData} = props
  return (
    <Context.Consumer>
      {value => {
        const {isDarkTheme} = value
        const {publishedAt, title, channel, thumbnailUrl, viewCount} = videoData

        return (
          <li className="home-main-container">
            <div className="right-container">
              <img src={thumbnailUrl} alt="video thumbnail" />
            </div>
            <div>
              <h1>{title}</h1>
              <p>{channel.name}</p>
              <p>{viewCount}</p>
              <p>{publishedAt}</p>
            </div>
          </li>
        )
      }}
    </Context.Consumer>
  )
}

export default SavedVideosItems
