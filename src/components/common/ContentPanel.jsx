import React from 'react'
import FillerComponent from './FillerComponent'
import FillerTopSection from './FillerTopSection'
import FillerBottomSection from './FillerBottomSection'
import MCComponent from './MCComponent'
import Accordion from './Accordion'
import Tabs from './Tabs'

const ContentPanel = ({ side, zoom, effectiveZoom, mode }) => {
  return (
    <div className="column-content">
      {side === 'left' && (
        <>
          {mode === 'inner-frame' ? (
            <div className="scrollable-inner-frame">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              
              <div className="placeholder-image">
                <span>400x400 Placeholder</span>
              </div>
              
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

              <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.</p>
              
              <FillerComponent />
            </div>
          ) : mode === 'accordions' ? (
            <>
              <Accordion title="Task Introduction" isOpen={true}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                
                <div className="placeholder-image">
                  <span>400x400 Placeholder</span>
                </div>
                
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.</p>
              </Accordion>
              
              <Accordion title="Simulation Inputs" isOpen={true}>
                <FillerComponent mode="accordions" section="top" />
              </Accordion>
              
              <Accordion title="Data Table" isOpen={true}>
                <FillerComponent mode="accordions" section="bottom" />
              </Accordion>
            </>
          ) : mode === 'tabs' ? (
            <Tabs defaultActiveTab={0}>
              <Tabs.Tab title="Introduction Text">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                
                <div className="placeholder-image">
                  <span>400x400 Placeholder</span>
                </div>
                
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.</p>
              </Tabs.Tab>
              
              <Tabs.Tab title="Form Section">
                <FillerTopSection />
              </Tabs.Tab>
              
              <Tabs.Tab title="Data Table">
                <FillerBottomSection />
              </Tabs.Tab>
            </Tabs>
          ) : (
            <>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              
              <div className="placeholder-image">
                <span>400x400 Placeholder</span>
              </div>
              
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

              <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.</p>
              
              <FillerComponent />
            </>
          )}
        </>
      )}
      
      {side === 'right' && (
        <>
          <p>This is a short introductory paragraph for the right panel content. It provides context for the multiple choice question interface below.</p>
          <p>This is a short introductory paragraph for the right panel content. It provides context for the multiple choice question interface below.</p>
        
          <MCComponent />
        </>
      )}
    </div>
  )
}

export default ContentPanel
