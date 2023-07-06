import {Component} from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import TrendingVideoItem from '../trendingVideoItem'
import Context from '../../Context'
import Header from '../Header'
import RightHeader from '../RightHeader'

class TrendingRoute extends Component {
  state = {
    isApiFailure: 'Loading',
    videosData: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const jwtToken = Cookie.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/trending`
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

  renderApiFailureView = isDark => {
    const image = !isDark
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
    return (
      <div>
        <img src={image} alt="failure" className="failure-img" />
        <h1>Opps something went wrong </h1>
        <p>We are having trouble</p>
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
    return videosData.map(each => (
      <TrendingVideoItem videoData={each} key={each.id} />
    ))
  }

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
    return (
      <Context.Consumer>
        {value => {
          const {isDarkTheme} = value
          const backgroundColor = isDarkTheme ? 'dark' : 'light'
          return (
            <div className={` ${backgroundColor} `}>
              <Header />
              <div className="home-main-container">
                <div className="left-container">
                  <RightHeader />
                </div>
                <div className="right-container">
                  <h1>Trending</h1>
                  <ul className={`videos-list-container ${backgroundColor}`}>
                    {this.renderAllVideos(isDarkTheme)}
                  </ul>
                </div>
              </div>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default TrendingRoute
