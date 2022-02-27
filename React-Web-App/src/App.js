import Navbar from "./Navbar";
import ViewAll from "./ViewAll";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./Create";
import BlogDetails from "./BlogDetails";
import NotFound from "./NotFound";
import Statistics from "./Statistics";
import Home from "./Home";
import Edit from "./Edit";
import NavbarHome from "./NavbarHome";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Switch>
            <Route exact path="/">
              <NavbarHome />
              <Home />
            </Route>

            <Route path="/view-all">
              <Navbar className="navbar-app" />
              <ViewAll />
            </Route>
            <Route path="/create">
              <Navbar className="navbar-app" />
              <Create />
            </Route>
            <Route path="/statistics">
              <Navbar className="navbar-app" />
              <Statistics />
            </Route>
            <Route path="/edit">
              <Navbar className="navbar-app" />
              <Edit />
            </Route>
            <Route path="/blogs/:id">
              <Navbar className="navbar-app" />
              <BlogDetails />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
