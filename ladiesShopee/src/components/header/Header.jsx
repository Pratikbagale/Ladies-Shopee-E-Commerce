import "./Header.css" 
function Header(){
   return(
       <div className="header">
            <div className="leftPanel flexContainer"><h1>Ladies Shopee</h1></div>

            <div className="rightPanel flexContainer">
               <a href="">Home</a>
               <a href="">SignUp</a>
               <a href="">Login</a>
               <a href="">Products</a>
           </div>
       </div>
   );
}

export default Header;  