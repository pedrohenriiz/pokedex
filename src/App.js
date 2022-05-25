import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Detail } from './pages/Detail';

import { Home } from './pages/Home';

// TODO Adicionar o toast
// TODO: Adicionar o detail responsivo
function App() {
  return (
    <Router>
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/:id' element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
