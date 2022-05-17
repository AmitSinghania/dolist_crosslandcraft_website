import React, { useEffect, useState } from "react";
import { db, projectStorage, projectFirestore } from "./firebase";
import { addDoc, collection } from "firebase/firestore";

const Input = () => {
  const productCollectionRef = collection(db, "products");
  const [category, setCategory] = useState("");
  const [newName, setNewName] = useState("");
  const [baseImage, setBaseImage] = useState("");
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [selectedImg, setSelectedImg] = useState();
  const [URL, setURL] = useState("");
  const [loading, setLoading] = useState(true);

  const types = ["image/jpeg", "image/png"];

  const UploadImageNew = (file) => {
    setLoading(true);

    const collectionRef = projectFirestore.collection("images");

    const storageRef = projectStorage.ref(file.name);

    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        // setProgress(percentage);
      },
      (err) => {
        // setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();

        setURL(url);
        setLoading(false);
      }
    );
  };

  const changeHandler = (e) => {
    let selected = e.target.files[0];
    console.log(selected);
    if (selected && types.includes(selected.type)) {
      UploadImageNew(selected);
    } else {
      // setFile(null);
      // setError("This is not a valid file select png or jpeg");
    }
  };

  const createUsers = async () => {
    await addDoc(productCollectionRef, {
      category: category,
      name: newName,
      productId: productId,
      image: URL,
    });
    console.log({
      category: category,
      name: newName,
      productId: productId,
      image: URL,
    });
  };

  return (
    <div className="Form">
      <div className="aligninput">
        <input
          type="text"
          placeholder="category"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="name"
          onChange={(e) => {
            setNewName(e.target.value);
          }}
        />
        <input
          placeholder="productId"
          onChange={(e) => {
            setProductId(e.target.value);
          }}
        />
        <input
          style={{ fontSize: "1em" }}
          type="file"
          onChange={(e) => {
            changeHandler(e);
          }}
        />
        <img src={baseImage} height="100px" />
        <button onClick={createUsers}>Create Users</button>
      </div>
      {products.map((product) => {
        return (
          <>
            <h1>{product.category}</h1>
            <h1>{product.name}</h1>
            <h1>{product.productId}</h1>
            <img src={product.image} style={{ height: 550 }} />
            console.log(<h1>{product.category}</h1>
            <h1>{product.name}</h1>
            <h1>{product.productId}</h1>
            <img src={product.image} style={{ height: 550 }} />)
          </>
        );
      })}
    </div>
  );
};

export default Input;
