
import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
import "./index.css"
import "./pet-bg.jpg"
import { useParams, useLocation, useNavigate } from "react-router-dom";
import * as client from "../users/client";
import { setCurrentUser } from "../users/reducer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


function Navbar() {
  const [account, setAccount] = useState(null);

  // const { currentUser } = useSelector((state) => state.userReducer);


  const navigate = useNavigate();

  const signout = async () => {
    const status = await client.signout();
    setAccount(null)
    navigate("/");
  };

  const {pathname} = useLocation();
  const path = pathname.split('/')
  console.log("Check here ->", path)
  console.log("check here" , path[1])

  const fetchAccount = async() => {
    try {
        const user = await client.account();
        setAccount(user)
    } catch (error) {
      console.error("Error fetching the account", error);
      
    }
  }

  console.log("Check user here: ", setAccount)

  useEffect( () => {
    fetchAccount();
  },[] )


  useEffect(() => {
    console.log("Account: ", account);
  }, [account] )



  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <a className="navbar-brand nav-logo" href="/">        
       Puppy Finder 🐶
        </a>

      <ul className="navbar-nav post-edit">

        <li className="nav-item post-edit2">
        <li className="nav-item">
          <NavLink className={`nav-link btn btn-warning nav-pos ${path[1].includes("detail") ||  path[1].includes("") ? "btn-ultra":""  }  `} to="/search">🔎 Search</NavLink></li>  
        </li>




      </ul>

      <div className="action-users">


          {account ? (
            <ul className="navbar-nav">
            {/* <li className="nav-item"><NavLink className="nav-link btn btn-secondary nav-acc" to="/account">Hello! {currentUser &&  <b>{currentUser.username}</b>}</NavLink></li> */}
            <li className="nav-item"><NavLink className="nav-link btn btn-secondary nav-acc" to="/account">Hello! <b>{account.username}</b></NavLink></li>
            <li className="nav-item"><NavLink className="nav-link btn btn-secondary nav-end" to="/account"><b>Settings</b> </NavLink></li>
            <li className="nav-item"><NavLink className="nav-link btn btn-secondary nav-log" to="/" onClick={signout}> <b>Logout</b> </NavLink></li>


            </ul>


          ):(
            <ul className="navbar-nav" >
              <li className="nav-item"><NavLink className="nav-link btn btn-secondary nav-end" to="/login">Login</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link btn btn-secondary nav-end" to="/register">Register</NavLink></li>

              </ul>

          )}

          {/* <ul className="navbar-nav" >
            <li className="nav-item"><NavLink className="nav-link btn btn-secondary nav-end" to="/">Dashboard</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link btn btn-secondary nav-end" to="/login">Login</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link btn btn-secondary nav-end" to="/register">Register</NavLink></li>
        </ul> */}


      </div>
    </nav>
  );
}

export default Navbar;
