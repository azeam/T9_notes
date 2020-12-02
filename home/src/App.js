import './App.css';
import axios from 'axios';
import Button from 'E:/reactNative/team9/T9_notes/home/src/components/Button.jsx';


function App() {
  return (
    <div>
      <form>
        <label>
          Title<br></br>
          <input type="text" name="title"/>
        </label><br></br>
        <label>
          Text<br></br>
          <textarea></textarea><br></br>
        </label>
        <Button>SAVE</Button>
      </form>
    </div>
  );
}

export default App;
