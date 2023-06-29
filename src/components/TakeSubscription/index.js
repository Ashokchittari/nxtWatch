import './index.css'

const TakeSubscription = props => {
  const {removeItem} = props
  return (
    <div className="main-container" data-testid="banner">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
          className="main-logo"
        />
        <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
        <button type="button">GET IT NOW</button>
      </div>
      <div>
        <button
          onClick={removeItem}
          type="button"
          className="xbutton"
          data-testid="close"
        >
          X
        </button>
      </div>
    </div>
  )
}

export default TakeSubscription
