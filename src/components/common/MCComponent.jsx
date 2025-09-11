import React, { useState } from 'react'

const MCComponent = () => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [eliminatedOptions, setEliminatedOptions] = useState(new Set())

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId)
  }

  const handleEliminateOption = (optionId, e) => {
    e.stopPropagation()
    setEliminatedOptions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(optionId)) {
        newSet.delete(optionId)
      } else {
        newSet.add(optionId)
      }
      return newSet
    })
  }

  const handleClearAnswer = () => {
    setSelectedOption(null)
    setEliminatedOptions(new Set())
  }

  const options = [
    { id: 'a', text: 'Midnight' },
    { id: 'b', text: 'Cocoa' },
    { id: 'c', text: 'Buttons' },
    { id: 'd', text: 'Speedy' }
  ]

  return (
    <div className="mc-component">
      <div className="mcq-options-container">
        {options.map((option) => {
          const isEliminated = eliminatedOptions.has(option.id)
          const isSelected = selectedOption === option.id
          
          return (
            <div 
              key={option.id}
              className={`mcq-option ${isEliminated ? 'dimmed-choice' : ''} ${isSelected ? 'selected' : ''}`}
              data-option-id={option.id}
              onClick={() => handleOptionSelect(option.id)}
            >
              <div className="mcq-option-letter-radio">
                <span className="mcq-option-letter">{option.id.toUpperCase()}</span>
                <span className={`mcq-option-radio-visual ${isSelected ? 'selected' : ''}`}></span>
              </div>
              <span className="mcq-option-text">{option.text}</span>
              <button 
                className="eliminate-choice-btn" 
                title="Eliminate this choice"
                onClick={(e) => handleEliminateOption(option.id, e)}
                disabled={isEliminated}
              >
                <span className="ec-dash-wrapper">–</span>
              </button>
            </div>
          )
        })}
      </div>
      
      <button className="clear-answer-btn" onClick={handleClearAnswer}>
        Clear Answer
      </button>
      
    </div>
  )
}

export default MCComponent
