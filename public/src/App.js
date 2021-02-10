import { HashRouter, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Headers";
import Gigs from "./pages/Gigs";
import Join from "./pages/Join";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Search from "./pages/Search";

function App() {
  return (
    <HashRouter>
      <Header />
      <Switch>
        <Route path="/join" component={Join} />
        <Route path="/login" component={Login} />
        <Route path="/search/gigs" component={Search} />
        <Route path="/:profile" exact component={Profile} />
        <Route path="/:profile/:gig" component={Gigs} />
        <Route path="/" component={Landing} />
      </Switch>
      <Footer />
    </HashRouter>
  );
}

export default App;
