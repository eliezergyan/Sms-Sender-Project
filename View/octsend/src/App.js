// import logo from './logo.svg';
import './App.css';
// import Home from './components/home';
// import Nav from './components/nav.js';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignIn from './components/signin/signIn';
import SignUp from './components/signup/signup';
import ResetPassword from './components/reset password/reset-password';
import Home from './components/home';
import Compose from './components/compose/compose';
// import History from './components/history/history';

// const styl = styles;
function App() {

  return (
    <div className="App">
      <Router>            
            <Routes>
                <Route path="/" element={<Home />} />                
                <Route path="/signup" element={<SignUp />} />                
                <Route path="/signin" element={<SignIn />} />
                <Route path="/reset-password" element = {<ResetPassword />} />
                <Route path="/compose" element = {<Compose />} />
                {/* <Route path="/history" element = {<History />} />                           */}
            </Routes>
        </Router>      
    </div>
  );
}

export default App;
