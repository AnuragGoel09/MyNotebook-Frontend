import './App.css';
import Navbar from './components/Navbar';
import Notebook from './components/Notebook';
import Home from './pages/Home';
import styled from 'styled-components';
import { BrowserRouter ,Routes,Route} from "react-router-dom";
import All_Notes from './pages/All_Notes';

const Container=styled.div`
  background-color: rgba(0,0,0,0.05);
`;

function App() {
  return (
    <BrowserRouter>
      <Container>
          <Navbar/> 
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/allnotes" element={<All_Notes/>} />
          </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
