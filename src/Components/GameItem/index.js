import './index.css'

const GameItem = props => {
  const {imageDetails} = props
  const {imageUrl, thumbnailUrl} = imageDetails
  return (
    <li className="image-item">
      <button type="button" className="image-button">
        <img src={thumbnailUrl} alt=" thumbnail" className="image" />
      </button>
    </li>
  )
}

export default GameItem
