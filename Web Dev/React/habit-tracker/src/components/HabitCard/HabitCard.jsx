import { useState } from 'react'
import './HabitCard.css'
import '../../variables.css'

function HabitCard() {
  const [count, setCount] = useState(0)

  return (
    <div className="card">
        <h2 className="habit-name">Hello</h2>
        <div className="history-container">Yeet
        </div>

    </div>
  )
}

export default HabitCard
