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


function App() {
  return (
    <>
      <BrowserRouter>
        <AppWrapper>
          <PageWrapper>
            <Header />
            <Routes>
              {/* Define Default Routes */}
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
