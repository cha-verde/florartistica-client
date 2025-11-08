import { useState, useEffect, useReducer } from "react";
import type { Product } from "./Product";
import "./Products.css";

function Products() {
  const initialProduct: Product = {
    id: 0,
    name: "",
    price: {
      digital: 0,
      physical: 0,
    },
    photo: [""],
  };

  //first time getting data

  useEffect(() => {
    fetchProducts();
  }, []);

  const [state, dispatch] = useReducer(reducer, initialProduct);

  const handleNameChange = (newName: string) => {
    dispatch({ type: "SET_NAME", payload: newName });
  };

  const handlePriceDigitalChange = (newPrice: number) => {
    dispatch({ type: "SET_PRICE_DIGITAL", payload: newPrice });
  };

  const handlePricePhysicalChange = (newPrice: number) => {
    dispatch({ type: "SET_PRICE_PHYSICAL", payload: newPrice });
  };

  const handlePhoto = (file) => {
    dispatch({ type: "SET_PHOTO", payload: file });
  };

  function reducer(state, action) {
    switch (action.type) {
      case "SET_ID":
        return { ...state, id: action.payload };
      case "SET_NAME":
        return { ...state, name: action.payload };
      case "SET_PRICE_DIGITAL":
        return {
          ...state,
          price: {
            ...state.price,
            digital: action.payload,
          },
        };
      case "SET_PRICE_PHYSICAL":
        return {
          ...state,
          price: {
            ...state.price,
            physical: action.payload,
          },
        };
      case "SET_PHOTO":
        return {
          ...state,
          photo: action.payload,
        };
    }
  }

  function fetchProducts() {
    fetch("http://localhost:5209/api/Products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }

  function createDataToSend() {
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("photo", state.photo);
    formData.append("price.digital", state.price.digital);
    formData.append("price.physical", state.price.physical);

    return formData;
  }

  const [products, setProducts] = useState<Product[]>([]);

  //edit product

  const [formStatus, changeFormStatus] = useState(false);
  const [sendingMode, changeSendingMode] = useState("");

  function checkMode(mode: string) {
    if (mode == "Add") {
      changeFormStatus(true);
      changeSendingMode("post");
    } else if (mode == "Edit") {
      changeFormStatus(true);
      changeSendingMode("put");
    }
  }

  function closeEdit() {
    changeFormStatus(false);
  }

  function editProduct(
    id: number,
    name: string,
    digital: number,
    physical: number,
    photo
  ) {
    dispatch({ type: "SET_ID", payload: id });
    dispatch({ type: "SET_NAME", payload: name });
    dispatch({ type: "SET_PRICE_DIGITAL", payload: digital });
    dispatch({ type: "SET_PRICE_PHYSICAL", payload: physical });

    changeFormStatus(true);
  }

  async function updateProduct(e) {
    e.preventDefault();

    const dataToSend = createDataToSend();
    dataToSend.append("id", state.id);

    const response = await fetch(
      `http://localhost:5209/api/products/${state.id}`,
      {
        method: "PUT",
        body: dataToSend,
      }
    );

    if (response.ok) {
      fetchProducts();
      changeFormStatus(false);
      alert("Success");
    }
  }

  //upload product

  const uploadProduct = async (e) => {
    e.preventDefault();

    const dataToSend = createDataToSend();

    await fetch("http://localhost:5209/api/products/", {
      method: "POST",
      body: dataToSend,
    });

    fetchProducts();
    e.target.reset();
  };

  //delete product

  async function deleteProduct(id: number) {
    const response = await fetch(`http://localhost:5209/api/products/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setProducts((p) => p.filter((product) => product.id != id));
    }
  }

  return (
    <div className="flex flex-row">
      {/* product edit form */}

      <form
        className={`flex flex-col gap-2 w-100 h-100 bg-white ${
          formStatus == true ? "block absolute" : "hidden"
        }`}
        onSubmit={function (e) {
          if (sendingMode == "post") {
            uploadProduct(e);
          } else if (sendingMode == "put") {
            updateProduct(e);
          }
        }}
      >
        <button type="button" onClick={() => closeEdit()}>
          X
        </button>
        <div className="text-center">Edit product</div>
        <label>Name</label>
        <input
          type="text"
          className="bg-gray-100/70 p-1 rounded-sm"
          value={state.name}
          onChange={(e) => handleNameChange(e.target.value)}
        ></input>
        <label htmlFor="">Price Digital</label>
        <input
          type="number"
          className="bg-gray-100/70 p-1 rounded-sm"
          onChange={(e) => handlePriceDigitalChange(e.target.value)}
          value={state.price.digital}
        ></input>
        <label htmlFor="">Price Physical</label>
        <input
          type="number"
          className="bg-gray-100/70 p-1 rounded-sm"
          onChange={(e) => handlePricePhysicalChange(e.target.value)}
          value={state.price.physical}
        ></input>
        <label>Photo</label>
        <input
          type="file"
          onChange={(e) => handlePhoto(e.target.files[0])}
        ></input>
        <button type="submit">Submit</button>
      </form>

      <div className="flex w-lg flex-row gap-2 p-5">
        {products.map((product) => (
          <div className="shadow-sm p-5">
            <div>{product.name}</div>
            <img
              className="object-scale-down rounded-md w-50"
              src={`http://localhost:5209/images/${product.photo}`}
              alt=""
            />
            <div>Digital: {product.price.digital}</div>
            <div>Physical: {product.price.physical}</div>
            <button
              onClick={function () {
                checkMode("Edit");
                editProduct(
                  product.id,
                  product.name,
                  product.price.digital,
                  product.price.physical,
                  product.photo
                );
              }}
            >
              Edit
            </button>
            <button onClick={() => deleteProduct(product.id)}>Remove</button>
          </div>
        ))}
      </div>

      <button onClick={() => checkMode("Add")}>Add product</button>
    </div>
  );
}

export default Products;
