import {Component} from 'react'

import './index.css'

import TabItem from '../TabItem'

import GameItem from '../GameItem'

class MatchGame extends Component {
  state = {
    isGameRunning: true,
    activeTab: [],
    displayingImages: [],
    score: 0,
    seconds: 60,
  }

  componentDidMount() {
    const {tabsList} = this.props
    // const {activeTab} = this.state
    this.setState({activeTab: tabsList[0].tabId})
    const {imagesList} = this.props
    this.setState({displayingImages: imagesList[0]})

    this.timerInterval = setInterval(() => {
      this.setState(prevState => ({seconds: prevState.seconds - 1}))
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval)
  }

  updateTab = tabId => {
    this.setState({activeTab: tabId})
  }

  getFilteredImages = () => {
    const {activeTab} = this.state
    const {imagesList} = this.props
    const filteredImages = imagesList.filter(
      eachImage => eachImage.category === activeTab,
    )
    return filteredImages
  }

  renderThumbnailImage = () => {
    const {displayingImages} = this.state
    const {imageUrl} = displayingImages

    return (
      <ul className="image-container">
        <li>
          <img src={imageUrl} alt="match" className="image-sizing" />
        </li>
      </ul>
    )
  }

  getShuffledList = () => {
    const {imagesList} = this.props
    const randomNumber = Math.floor(Math.random() * imagesList.length)
    return imagesList[randomNumber]
  }

  updateImage = id => {
    // console.log(id)
    const {displayingImages} = this.state
    const isMatched = displayingImages.id.includes(id)
    console.log(isMatched)
    if (isMatched) {
      this.setState(prevState => ({score: prevState.score + 1}))
      const shuffledListItem = this.getShuffledList()
      console.log(shuffledListItem)
      this.setState({displayingImages: shuffledListItem})
    } else {
      this.setState({isGameRunning: false})
      clearInterval(this.timerInterval)
    }
  }

  renderGameCard = () => {
    const {tabsList} = this.props
    // const {imagesList} = this.props
    const {activeTab} = this.state
    const filteredImages = this.getFilteredImages()
    return (
      <div className="games-list-container">
        {this.renderThumbnailImage()}
        <ul className="tabs-container">
          {tabsList.map(eachTab => (
            <TabItem
              tabDetails={eachTab}
              key={eachTab.tabId}
              updateTab={this.updateTab}
              isActive={activeTab === eachTab.tabId}
            />
          ))}
        </ul>
        <ul className="games-list-container1">
          {filteredImages.map(eachImage => (
            <GameItem
              imageDetails={eachImage}
              key={eachImage.id}
              updateImage={this.updateImage}
            />
          ))}
        </ul>
      </div>
    )
  }

  resetGame = () => {
    const {tabsList} = this.props
    const {imagesList} = this.props
    this.setState({
      isGameRunning: true,
      score: 0,
      activeTab: tabsList[0].tabId,
      displayingImages: imagesList[0],
      seconds: 60,
    })
    this.timerInterval = setInterval(() => {
      this.setState(prevState => ({seconds: prevState.seconds - 1}))
    }, 1000)
  }

  renderScoreCard = () => {
    const {score} = this.state
    return (
      <ul className="score-card-container">
        <li className="trophy-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
            alt="trophy"
            className="trophy"
          />
        </li>
        <p className="your-score-text">YOUR SCORE</p>
        <h1 className="score">{score}</h1>
        <li className="button-container">
          <button
            type="button"
            className="reset-button"
            onClick={this.resetGame}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
              alt="reset"
              className="reset"
            />
            <p className="play-again-text">PLAY AGAIN</p>
          </button>
        </li>
      </ul>
    )
  }

  render() {
    const {isGameRunning, seconds} = this.state
    const {tabsList, imagesList} = this.props
    // console.log(activeTab)
    // console.log(clickedImages)
    const {score} = this.state
    if (seconds === 0) {
      console.log('clear interval')
      clearInterval(this.timerInterval)
      this.setState({
        isGameRunning: false,
        activeTab: tabsList[0].tabId,
        displayingImages: imagesList[0],
        seconds: 60,
      })
    }

    return (
      <div className="app-container">
        <ul className="navbar-container">
          <li className="app-logo">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
              alt="website logo"
              className="website-logo"
            />
          </li>
          <li className="score-timer-container">
            <div className="score-container">
              <p className="score-text">Score: </p>
              <p className="score-number">{score}</p>
            </div>
            <div className="timer-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timer"
              />
              <p className="timer-number">{seconds} sec</p>
            </div>
          </li>
        </ul>
        <div className="match-game-body-container">
          {isGameRunning ? this.renderGameCard() : this.renderScoreCard()}
        </div>
      </div>
    )
  }
}

export default MatchGame
