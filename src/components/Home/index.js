import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookie from 'js-cookie'
import {BiSearch} from 'react-icons/bi'
import VideoItem from '../VideoItem'
import Context from '../../Context'
import Header from '../Header'
import RightHeader from '../RightHeader'
import TakeSubscription from '../TakeSubscription'
import './index.css'

class Home extends Component {
  state = {
    checkSubscription: true,
    searchInput: '',
    isApiFailure: 'Loading',
    videosData: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {searchInput} = this.state
    const jwtToken = Cookie.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = data.videos.map(each => ({
      id: each.id,
      channel: each.channel,
      publishedAt: each.published_at,
      thumbnailUrl: each.thumbnail_url,
      title: each.title,
      viewCount: each.view_count,
    }))
    if (response.ok) {
      if (updatedData.length === 0) {
        this.setState({isApiFailure: 'Empty'})
      } else {
        this.setState({
          videosData: updatedData,
          isApiFailure: 'Success',
        })
      }
    } else {
      this.setState({isApiFailure: 'Failure'})
    }
  }

  removeItem = () => {
    this.setState({checkSubscription: false})
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  updateSearchInput = () => {
    this.getData()
  }

  renderApiFailureView = isDark => {
    const image = !isDark
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
    return (
      <div>
        <img src={image} alt="failure view" className="failure-img" />
        <h1>Oops! Something Went Wrong </h1>
        <p>We are having some trouble</p>
        <button onClick={this.getData} type="button">
          Retry
        </button>
      </div>
    )
  }

  renderLoadingView = () => (
    <div data-testId="loader">
      <Loader />
    </div>
  )

  renderVideosListView = () => {
    const {videosData} = this.state
    return videosData.map(each => <VideoItem videoData={each} key={each.id} />)
  }

  emptyView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
      />
      <h1>No Search results found</h1>
      <p>Try different key words or remove search filter</p>
      <button type="button" onClick={this.getData}>
        Retry
      </button>
    </div>
  )

  renderAllVideos = isDarkTheme => {
    const {isApiFailure} = this.state
    console.log(isApiFailure)
    switch (isApiFailure) {
      case 'Success':
        return this.renderVideosListView()
      case 'Failure':
        return this.renderApiFailureView(isDarkTheme)
      case 'Loading':
        return this.renderLoadingView()
      case 'Empty':
        return this.emptyView()
      default:
        return null
    }
  }

  render() {
    const {checkSubscription} = this.state
    return (
      <Context.Consumer>
        {value => {
          const {isDarkTheme} = value
          const backgroundColor = isDarkTheme ? 'dark' : 'light'
          return (
            <div className={backgroundColor}>
              <Header />
              <div className="home-main-container">
                <div className="left-container">
                  <RightHeader />
                </div>
                <div className="right-container">
                  {checkSubscription && (
                    <TakeSubscription removeItem={this.removeItem} />
                  )}

                  <div className="search-container">
                    <div className="container2">
                      <input
                        className="search-input"
                        type="search"
                        placeholder="Search"
                        onChange={this.changeSearchInput}
                      />
                      <button
                        type="button"
                        className="search-btn"
                        data-testid="searchButton"
                        onClick={this.updateSearchInput}
                      >
                        <BiSearch className="search-icon" />
                      </button>
                    </div>
                    <ul className={`videos-list-container ${backgroundColor}`}>
                      {this.renderAllVideos(isDarkTheme)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default Home
