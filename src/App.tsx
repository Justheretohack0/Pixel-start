import { useState } from 'react'
import { ThemeProvider } from './context/ThemeProvider'
import { ThemeSettings } from './components/ThemeSettings'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider>
      <ThemeSettings />
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-primary">Palette Theme Engine</h1>
          <p className="text-lg text-muted">
            Explore the themes by clicking "Settings" in the top right corner.
          </p>
        </div>

        <div className="bg-surface p-8 rounded-xl shadow-lg border border-white/5 max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-4 text-secondary">Demo Component</h2>
          <p className="mb-6 text-text">
            This card demonstrates how the theme colors are applied to different elements.
          </p>

          <div className="flex flex-col gap-4">
            <button
              className="px-4 py-2 bg-primary text-background font-bold rounded hover:opacity-90 transition-opacity"
              onClick={() => setCount((count) => count + 1)}
            >
              Counter: {count}
            </button>

            <button className="px-4 py-2 bg-secondary text-white font-bold rounded hover:opacity-90 transition-opacity">
              Secondary Action
            </button>

            <button className="px-4 py-2 border-2 border-accent text-accent font-bold rounded hover:bg-accent/10 transition-colors">
              Accent Outline
            </button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
