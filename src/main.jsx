import React from 'react'
import ReactDOM from 'react-dom/client'
import RetaynedSite from './App'

const rootEl = document.getElementById('root')

if (rootEl.hasChildNodes()) {
  // Prerendered HTML exists → hydrate (attach to it)
  ReactDOM.hydrateRoot(
    rootEl,
    <React.StrictMode>
      <RetaynedSite />
    </React.StrictMode>,
  )
} else {
  // Dev / no prerender → normal render
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <RetaynedSite />
    </React.StrictMode>,
  )
}
