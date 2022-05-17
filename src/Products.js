import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import "./product.css";
import Input from "./Input";
import {
  getDocs,
  doc,
  collection,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();

const Products = ({ category_name }) => {
  const [currentUserRole, setCurrentUserRole] = useState();
  const [products, setProducts] = useState([]);
  // const [varname, setvarname] = useState("test");
  const productsRef = collection(db, "products");

  const currentUser = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (!user.email) return;
      console.log("user email: ", user.email);
      const currentperson = await db.collection("users").doc(user.email).get();
      console.log("Current Person Role: ", currentperson.data()?.role);
      console.log("\n");
      /*Setting var name*/
      //setvarname("not test");
      // varname = "not test";
      /*Immediately accessing varname*/
      //console.log(varname);
      //
      setCurrentUserRole(currentperson.data()?.role);
    });
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "products", id);
    await deleteDoc(userDoc);
  };

  const getProducts = async () => {
    const q = query(productsRef, where("category", "==", category_name));
    const data = await getDocs(q);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const debug = () => {
    // console.log(doc.id);
    // console.log(users);
    // console.log(currentUserRole);
  };
  useEffect(() => {
    currentUser();
    getProducts();
  }, []);
  useEffect(() => {
    debug();
  }, [doc, currentUserRole]);

  return (
    <div className="productcontainer">
      {products.map((product) => {
        return (
          <div className="productcontainer-single" key={product.id}>
            <img
              src={product.image}
              alt="CC"
              style={{ height: 200, width: 225 }}
              // height:185, width:200
            />
            <h3>{product.name}</h3>
            <p style={{ display: "none" }}>{product.id}</p>
            <p>{product.productId}</p>

            {currentUserRole === "admin" ? (
              <button
                style={{ width: 150 }}
                onClick={() => {
                  deleteUser(product.id);
                  console.log(product.productId);
                }}
              >
                Delete User
              </button>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
export default Products;
