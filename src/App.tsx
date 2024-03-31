import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  AppWrapper,
  PageWrapper,
} from './styles'

// Header & Footer
import Header from './components/header';
import Footer from './components/footer';

// App Pages
import Playground from "./pages/playground";
import Playground2 from './pages/playground2';


function App() {
  return (
    <>
      <BrowserRouter>
        <AppWrapper>
          <PageWrapper>
            <Header />
            <Routes>
              <Route path="/" element={<Playground />} />
              <Route path="/p2" element={<Playground2 />} />
            </Routes>
          </PageWrapper>
          <Footer />
        </AppWrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
