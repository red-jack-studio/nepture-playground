import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  AppWrapper,
  PageWrapper,
} from './styles'

// Header & Footer
import Header from './components/Header';
import Footer from './components/Footer';

// App Pages
import Playground from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppWrapper>
          <PageWrapper>
            <Header />
            <Routes>
              <Route path="/" element={<Playground />} />
            </Routes>
          </PageWrapper>
          <Footer />
        </AppWrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
