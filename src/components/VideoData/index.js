import {Component} from 'react'
import ReactPlayer from 'react-player'
import Cookies from 'js-cookie'
import Context from '../../Context'
import RightHeader from '../RightHeader'
import Header from '../Header'
import './index.css'

class VideoData extends Component {
  state = {videoDataList: [], channel: {}}

  componentDidMount() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.getVideoData(id)
  }

  getVideoData = async id => {
    const jwtToken = await Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        channel: data.video_details.channel,
        description: data.video_details.description,
        id: data.video_details.id,
        publishedAt: data.video_details.published_at,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        thumbnailUrl: data.video_details.thumbnail_url,
        viewCount: data.video_details.view_count,
      }
      this.setState({videoDataList: updatedData, channel: updatedData.channel})
    }
  }

  render() {
    return (
      <Context.Consumer>
        {value => {
          const {addVideo, isDarkTheme, savedVideos} = value
          const {videoDataList, channel} = this.state
          const {description, publishedAt, videoUrl, viewCount} = videoDataList
          const savedText = savedVideos.includes(videoDataList)
            ? 'Saved'
            : 'Save'
          const theme = isDarkTheme ? 'dark' : 'light'
          const updateSavedList = () => {
            console.log('saved')
            addVideo(videoDataList)
          }

          return (
            <div className={theme}>
              <Header />
              <div className="home-main-container">
                <div className="left-container">
                  <RightHeader />
                </div>
                <div className={`right-container ${theme}`}>
                  <ReactPlayer url={videoUrl} width="80%" />
                  <p>{description}</p>
                  <div>
                    <div>
                      <p>{viewCount} views</p>
                      <p>{publishedAt}</p>
                    </div>
                    <div>
                      <button type="button">Like</button>
                      <button type="button">Dislike</button>
                      <button onClick={updateSavedList} type="button">
                        {savedText}
                      </button>
                    </div>
                    <div>
                      <img src={channel.profile_image_url} alt={channel.name} />
                      <p>{channel.name}</p>
                      <p>{channel.subscriber_count}</p>
                    </div>
                    <p>{description}</p>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default VideoData
