import {Component} from 'react'

import './index.css'

import TabItem from '../TabItem'

import GameItem from '../GameItem'

class MatchGame extends Component {
  state = {isGameRunning: true, score: 0, filteredImages: [], activeTab: []}

  componentDidMount() {
    const {tabsList} = this.props
    const {activeTab} = this.state
    this.setState({activeTab: tabsList[0].tabId})
    console.log(activeTab)
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

  renderGameCard = () => {
    const {tabsList} = this.props
    const {imagesList} = this.props
    const {activeTab} = this.state
    const filteredImages = this.getFilteredImages()
    return (
      <div className="games-list-container">
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
            <GameItem imageDetails={eachImage} key={eachImage.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderScoreCard = () => {}

  render() {
    const {isGameRunning, activeTab} = this.state
    console.log(activeTab)
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
              <p className="score-number">0</p>
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
