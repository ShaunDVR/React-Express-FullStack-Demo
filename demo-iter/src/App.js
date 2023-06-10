import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TaskList } from "./pages/TaskList";
import { UpdateTask } from "./pages/UpdateTask";
import { CreateTask } from "./pages/CreateTask";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={TaskList} />
          <Route path="/edit/:taskId" Component={UpdateTask} />
          <Route path="/create" Component={CreateTask} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
