import { useState, useEffect } from 'react'

export interface HistoryItem {
  id: string
  type: string
  input: string
  result: string
  timestamp: number
  favorite?: boolean
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('calcpro_history')
    if (saved) {
      try {
        setHistory(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse history', e)
      }
    }
  }, [])

  const addHistory = (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    const newItem: HistoryItem = {
      ...item,
      id: Math.random().toString(36).substring(2, 11),
      timestamp: Date.now()
    }
    const updated = [newItem, ...history].slice(0, 50) // Keep last 50
    setHistory(updated)
    localStorage.setItem('calcpro_history', JSON.stringify(updated))
  }

  const toggleFavorite = (id: string) => {
    const updated = history.map(item => 
      item.id === id ? { ...item, favorite: !item.favorite } : item
    )
    setHistory(updated)
    localStorage.setItem('calcpro_history', JSON.stringify(updated))
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('calcpro_history')
  }

  return { history, addHistory, toggleFavorite, clearHistory }
}
