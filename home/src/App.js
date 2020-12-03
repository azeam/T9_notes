import './App.css';
import signup from './pages/signup';
import NoteForm from './pages/NoteForm';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
      <Router>
          <div>
            <Switch>
              <Route exact path="/signup" component={signup}/>
              <Route path="/newnote" component={NoteForm} />
            </Switch>
          </div>
      </Router>
  );
}

export default App;
