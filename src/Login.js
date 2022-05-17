import React, { useState, useEffect, useContext } from "react";
import { db } from "./firebase";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { auth } from "./firebase";
import { getAuth } from "firebase/auth";
import { loginContext } from "./Context/loginContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { FiUser } from "react-icons/fi";

const Login = () => {
  const auth = getAuth();
  const myUserId = auth.currentUser?.uid;
  console.log(myUserId);
  console.log(auth.currentUser);
  console.log(auth.currentUser?.email);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [loginPassword, setLoginPassword] = useState("");
  const [mail, setMail] = useState("");
  const [role, setRole] = useState("customer");
  const [loginEmail, setLoginEmail] = useState("");
  const [userLists, setUserLists] = useState([""]);
  const [user, setUser] = useState([]);

  const getuserfromfirestore = async () => {
    const email = auth.currentUser?.email;
    console.log(email);
    const user = await db.collection("users").doc(email).get();
    console.log(user.data()?.role);
  };
  useEffect(() => {
    getuserfromfirestore();
  });

  const createUserInFirestore = async (e) => {
    e.preventDefault();

    await db.collection("users").doc(mail).set({
      mail: mail,
      role: role,
    });
  };

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      //setId(user.user.uid)
      //setRole(role)
    } catch (error) {
      console.log(error.message);
    }
  };
  const userLogin = async (e) => {
    e.preventDefault();
    try {
      const login = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );

      // setContext(loginEmail)
    } catch (error) {
      console.log(error.message);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <form>
        <h3>Registeruser</h3>
        <input
          placeholder="email"
          type="text"
          onChange={(e) => {
            setRegisterEmail(e.target.value);
            setMail(e.target.value);
          }}
        />

        <input
          placeholder="password"
          type="text"
          onChange={(e) => {
            setRegisterPassword(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            registerUser(e);
            createUserInFirestore(e);
          }}
        >
          Create user
        </button>
        <h3>LoginUser</h3>
        <input
          placeholder="email"
          type="text"
          onChange={(e) => {
            setLoginEmail(e.target.value);
          }}
        ></input>
        <input
          placeholder="password"
          onChange={(e) => {
            setLoginPassword(e.target.value);
          }}
        />
        <button onClick={userLogin}>Login</button>
        <h3>
          UserLoggedIn: {user?.email}
          {user?.role}
        </h3>

        <button onClick={logOut}>Signout</button>
      </form>
    </div>
  );
};
export default Login;
