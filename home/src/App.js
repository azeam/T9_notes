import './App.css';
import signup from './pages/signup';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
      <Router>
          <div>
            <Switch>
              <Route exact path="/signup" component={signup}/>
            </Switch>
          </div>
      </Router>
  );
}

export default App;
