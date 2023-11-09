import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotifiContextProvider } from './services/CounterContext'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <NotifiContextProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </NotifiContextProvider>


)