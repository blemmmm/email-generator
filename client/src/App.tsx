import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { RouterView } from './router/RouterView';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RouterView />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
