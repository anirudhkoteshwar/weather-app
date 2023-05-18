import './App.css'
import Search from './components/search/search'

function App() {

  return (
    <div className='panelWrapper'>
      <div className='leftPanel'></div>
      <div className='rightPanel'>
        <Search />
      </div>
    </div>
  )
}

export default App
