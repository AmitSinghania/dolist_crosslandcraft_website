import React, { useState, useEffect } from "react";
//import { loginContext } from "./loginContext";
import App from "../App";
import Login from "../Login";
import { db } from "../firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useResolvedPath } from "react-router-dom";
import { loginContext } from "./loginContext";
//import { useResolvedPath } from "react-router-dom";
const Wrapper = ({ children }) => {
  const [role, setRole] = useState("");
  const [id, setId] = useState({});

  const collectionRef = collection(db, "users");
  const Wrapper = () => {
    const updateUser = async (id, role) => {
      const userDoc = doc(db, "users", id);
      const newField = role + 1;
      await updateDoc(userDoc, newField);
    };
  };
  return (
    <div>
      <loginContext.Provider value={(role, setRole, id, setId)}>
        {children}
      </loginContext.Provider>
    </div>
  );
};
export default Wrapper;
