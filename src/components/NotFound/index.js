import Context from '../../Context'

const NotFound = () => (
  <Context.Consumer>
    {value => {
      const {isDarkTheme} = value
      const imgUrl = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
      return (
        <div>
          <img src={imgUrl} alt="not found" />
          <h1>Page Not Found</h1>
          <p>we are sorry, the page you requested could not be found.</p>
        </div>
      )
    }}
  </Context.Consumer>
)

export default NotFound
