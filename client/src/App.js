import "./App.css";
import { Chat } from "./components/chatroom/chat";
import { Login } from "./components/login/login";

import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/chat" component={Chat} />
      </Router>
    </div>
  );
}

export default App;
