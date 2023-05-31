import { useState } from 'react'
import './App.css'
import HabitCard from './components/HabitCard/HabitCard.jsx'
import './variables.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="d-flex justify-content-center">
    {/* Will loop through habit cards to display, depending on how many habits are being tracked */}
      <HabitCard></HabitCard>
    </div>
  )
}

export default App
