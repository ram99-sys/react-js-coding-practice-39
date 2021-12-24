import {Component} from 'react'

import './index.css'

import TabItem from '../TabItem'

import GameItem from '../GameItem'

class MatchGame extends Component {
  state = {isGameRunning: true, activeTab: [], displayingImages: [], score: 0}

  componentDidMount() {
    const {tabsList} = this.props
    // const {activeTab} = this.state
    this.setState({activeTab: tabsList[0].tabId})
    const {imagesList} = this.props
    this.setState({displayingImages: imagesList[0]})
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
      <div className="image-container">
        <img src={imageUrl} alt="match" className="image-sizing" />
      </div>
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
    this.setState({
      isGameRunning: true,
      score: 0,
      activeTab: [],
    })
  }

  renderScoreCard = () => {
    const {score} = this.state
    return (
      <div className="score-card-container">
        <div className="trophy-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
            alt="trophy"
            className="trophy"
          />
        </div>
        <h1 className="your-score-text">YOUR SCORE</h1>
        <h1 className="score">{score}</h1>
        <div className="button-container">
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
        </div>
      </div>
    )
  }

  render() {
    const {isGameRunning, activeTab, clickedImages} = this.state
    // console.log(activeTab)
    // console.log(clickedImages)
    const {score} = this.state

    return (
      <div className="app-container">
        <div className="navbar-container">
          <div className="app-logo">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
              alt="website logo"
              className="website-logo"
            />
          </div>
          <div className="score-timer-container">
            <div className="score-container">
              <h1 className="score-text">Score: </h1>
              <p className="score-number">{score}</p>
            </div>
            <div className="timer-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timer"
              />
              <p className="timer-number">60 sec</p>
            </div>
          </div>
        </div>
        <div className="match-game-body-container">
          {isGameRunning ? this.renderGameCard() : this.renderScoreCard()}
        </div>
      </div>
    )
  }
}

export default MatchGame
