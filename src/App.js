import './App.css';
import Home from './pages/Home';
import styled from 'styled-components';
import { BrowserRouter ,Routes,Route} from "react-router-dom";
import All_Notes from './pages/All_Notes';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NoteState from './context/notes/noteState';
import NotebookState from './context/notebooks/notebookState';
import ChecklistState from './context/checklists/checklistState'
import Notebook from './pages/Notebook';
import LoginState from './context/login/loginState';
const Container=styled.div`
  background-color: rgba(0,0,0,0.05);
  /* box-sizing: border-box; */
  overflow: hidden;
  /* min-height: 100vh; */
`;

function App() {
  return (
    <>
  <Container>
      <LoginState>
          <NotebookState>
            <NoteState>
              <ChecklistState>
                <BrowserRouter>
                      <Routes>
                        <Route exact path="/login" element={<Login/>} />
                        <Route exact path="/signup" element={<SignUp/>} />
                        <Route exact path="/" element={<Home/>} />
                        <Route exact path="/allnotes" element={<All_Notes/>} />
                        <Route exact path="/:notebookId" element={<Notebook/>} />
                      </Routes>
                </BrowserRouter>
              </ChecklistState>
            </NoteState>
          </NotebookState> 
      </LoginState> 
  </Container>
    </>
  );
}

export default App;
