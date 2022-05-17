import React, { useState, useEffect, Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import ErrorPage from "./ErrorPage";
import { loginContext } from "./Context/loginContext";
import Input from "./Input";
import Products from "./Products";
import Wrapper from "./Context/Wrapper";
import { getAuth } from "firebase/auth";
import { db } from "./firebase";
import { collection, getDocs, doc } from "firebase/firestore";
import NotFound from "./NotFound";
import Navbar from "./Navbar";
import "./navbar.css";
import "./footer.css";
import Footer from "./Footer";
import "./index.css";
import "./home.css";
const App = () => {
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);
  const auth = getAuth();

  const getuserfromfirestore = async () => {
    const email = auth.currentUser?.email;
    // console.log(email);
    const user = await db.collection("users").doc(email).get();
    setRole(user.data()?.role);
    if (role === "admin") {
      // console.log(role);
      // console.log("input");
    } else {
      // console.log("error page");
    }
  };
  useEffect(() => {
    getuserfromfirestore();
  });

  const userRef = collection(db, "users");
  // console.log(userRef);

  const routes = [
    {
      link: "/",
      Component: () => <Home />,
      admin: false,
    },
    {
      link: "/input",
      admin: true,
      Component: () => <Input />,
    },
    {
      link: "/chopping_board",
      Component: () => <Products category_name={"chopping_board"} />,
      admin: false,
    },
    {
      link: "/terracotta",
      Component: () => <Products category_name={"terracotta"} />,
      admin: false,
    },
    {
      link: "/furniture",
      Component: () => (
        <Products
          style={{ display: "flex", flexDirection: "column" }}
          category_name={"furniture"}
        />
      ),
      admin: false,
    },
    {
      link: "/login",
      Component: () => <Login />,
      admin: false,
    },
  ];
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          {routes.map(({ link, Component, admin: requireAdmin }, index) => {
            // console.log("admin " + index, requireAdmin);
            // console.log("role " + index, role === "admin");
            if (!requireAdmin)
              return <Route exact path={link} element={<Component />} />;
            if (role === "admin")
              return <Route exact path={link} element={<Component />} />;
            else return <Route exact path={link} element={<NotFound />} />;
            //
            if (!requireAdmin === true) {
              if (role === "admin") {
              } else {
                return <Route exact path={link} element={<NotFound />} />;
              }
            } else {
              return <Route exact path={link} element={<NotFound />} />;
            }
          })}
        </Routes>

        <Footer />
      </Router>
    </div>
  );
};
export default App;

/* <div>
      <Router>
        <Navbar />
        {/*<div>
                <Routes>
                  <Route exact path={"login"} element={<Login />} />
                </Routes>
        </div>*/

//</Routes>{routes.map(({ link, Component, admin }) => {

// {role ? 'admin'===<Route exact path={link} element={<Component />} :<Route exact path={link} element={<NotFound />} }

//*/}

// console.log(users.loginEmail);
// if (

//UserDoc.child("singhaniaakshat1@gmail.com").get().role == "admin"
//) {
// return (
//   <Route
//     exact
//     path={link}
//     element={<Component className="products" />}
//   />
// );
// } else if (!admin) {
// <Route path={link} element={<Component />} />;
//} else {

//}
//})}
