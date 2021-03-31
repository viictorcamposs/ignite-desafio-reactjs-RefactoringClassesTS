import { BrowserRouter as Router } from 'react-router-dom';
import { FoodsProvider } from './hooks/useFoods';
import { Routes } from './routes';
import { GlobalStyles } from './styles/global';

export const App = (): JSX.Element => (
  <FoodsProvider>
    <GlobalStyles />
    <Router>
      <Routes />
    </Router>
  </FoodsProvider>
);