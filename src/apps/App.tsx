import '@apps/styles/styles.css';
import AppRouteProvider from '@apps/providers/AppRouteProvider.tsx';
import TanstackQueryProvider from '@apps/providers/TanstackQueryProvider.tsx';

function App() {
  return (
    <TanstackQueryProvider>
      <AppRouteProvider />
    </TanstackQueryProvider>
  );
}

export default App;
