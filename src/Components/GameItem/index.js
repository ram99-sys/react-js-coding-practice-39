import './index.css'

const GameItem = props => {
  const {imageDetails, updateImage} = props
  const {thumbnailUrl, id} = imageDetails
  const onClickImageButton = () => {
    updateImage(id)
  }

  return (
    <li className="image-item">
      <button
        type="button"
        className="image-button"
        onClick={onClickImageButton}
      >
        <img src={thumbnailUrl} alt=" thumbnail" className="image" />
      </button>
    </li>
  )
}

export default GameItem
