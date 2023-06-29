import Context from '../../Context'
import Header from '../Header'
import RightHeader from '../RightHeader'
import Empty from '../EmptyViewSaved'
import SavedVideosItems from '../SavedVideosItems'

const SavedVideos = () => {
  const renderVideosListView = videosData =>
    videosData.map(each => <SavedVideosItems videoData={each} key={each.id} />)

  return (
    <Context.Consumer>
      {value => {
        const {isDarkTheme, savedVideos} = value
        console.log(savedVideos)
        const isSavedEmpty = savedVideos.length === 0
        const backgroundColor = isDarkTheme ? 'dark' : 'light'
        return (
          <div className={` ${backgroundColor} `} data-testid="savedVideos">
            <Header />
            <div className="home-main-container">
              <div className="left-container">
                <RightHeader />
              </div>
              <div className="right-container">
                <h1>Saved Videos</h1>
                {isSavedEmpty ? (
                  <Empty />
                ) : (
                  <ul className={`videos-list-container ${backgroundColor}`}>
                    {renderVideosListView(savedVideos)}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )
      }}
    </Context.Consumer>
  )
}

export default SavedVideos
