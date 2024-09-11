import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { StyleSheetManager } from 'styled-components'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './ui/ErrorFallback'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.replace('/')}>
      <StyleSheetManager shouldForwardProp={() => true}>
        <App />
      </StyleSheetManager>
    </ErrorBoundary>
  </React.StrictMode>
)

/*
Pwd-Supabase: 4W7GgY67gHc61sMQ
*/
