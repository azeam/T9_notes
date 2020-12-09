import "./App.css";
import signup from "./pages/signup";
import login from "./pages/login";
import NoteForm from "./pages/NoteForm";
import history from "./utils/history"
import { Router, Route, Switch } from "react-router-dom";

function App() {
  return (
      <Router history={history}>
          <div>
            <Switch>
              <Route exact path="/signup" component={signup}/>
              <Route exact path="/" component={NoteForm} />
              <Route exact path="/login" component={login}/>
            </Switch>
          </div>
      </Router>
  );
}

export default App;
