import "./Nav.css" ;
import {Link} from "react-router-dom";
import React from "react";

function Nav(){
   return(
       <div className="nav">
            <div className="leftPanel flexContainer"><h1>  Ladies Shopee</h1></div>

            <div className="rightPanel flexContainer">
               <Link to="/">Home</Link>
               <Link to="/signup">Signup</Link>
               <Link to="/login">Login</Link>
               <Link to="/products">Products</Link>
           </div>
       </div>
   );
}

export default Nav;  