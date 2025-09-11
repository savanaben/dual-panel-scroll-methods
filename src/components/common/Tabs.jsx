import React, { useState } from 'react'

const Tabs = ({ children, defaultActiveTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab)

  // Extract tab data from children
  const tabs = React.Children.map(children, (child, index) => ({
    id: index,
    title: child.props.title,
    content: child.props.children
  }))

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
            aria-selected={activeTab === index}
            role="tab"
            aria-controls={`tab-panel-${index}`}
          >
            {tab.title}
          </button>
        ))}
      </div>
      
      <div className="tabs-content">
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            id={`tab-panel-${index}`}
            className={`tab-panel ${activeTab === index ? 'active' : ''}`}
            role="tabpanel"
            aria-hidden={activeTab !== index}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  )
}

// Tab component for individual tab content
const Tab = ({ title, children }) => {
  return null // This component is just for data extraction, doesn't render
}

Tabs.Tab = Tab

export default Tabs
