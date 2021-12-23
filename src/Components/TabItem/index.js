import './index.css'

const TabItem = props => {
  const {tabDetails, updateTab, isActive} = props
  const {displayText, tabId} = tabDetails
  const onClickTabButton = () => {
    updateTab(tabId)
  }
  const applyBorder = isActive ? 'border' : ''
  const applyColor = isActive ? 'text-color' : ''
  return (
    <li className="tab-item">
      <button
        type="button"
        className={`button ${applyBorder} ${applyColor}`}
        onClick={onClickTabButton}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
