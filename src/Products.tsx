import { useState, useEffect, useReducer } from "react";
import type { Product } from "./Product";
import "./Products.css";
import { useRef } from "react";

function Products() {
  const initialProduct: Product = {
    id: 0,
    name: "",
    price: {
      digital: 0,
      a5: 0,
      a4: 0,
      a3: 0,
      a2: 0,
      a1: 0,
      a0: 0,
      size5x7: 0,
      size8x10: 0,
      size11x14: 0,
      size12x18: 0,
      size16x20: 0,
      size18x24: 0,
      size24x36: 0,
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

  const handlePriceA5Change = (newPrice: number) => {
    dispatch({ type: "SET_PRICE_A5", payload: newPrice });
  };
  const handlePriceA4Change = (newPrice: number) => {
    dispatch({ type: "SET_PRICE_A4", payload: newPrice });
  };
  const handlePriceA3Change = (newPrice: number) => {
    dispatch({ type: "SET_PRICE_A3", payload: newPrice });
  };
  const handlePriceA2Change = (newPrice: number) => {
    dispatch({ type: "SET_PRICE_A2", payload: newPrice });
  };
  const handlePriceA1Change = (newPrice: number) => {
    dispatch({ type: "SET_PRICE_A1", payload: newPrice });
  };
  const handlePriceA0Change = (newPrice: number) => {
    dispatch({ type: "SET_PRICE_A0", payload: newPrice });
  };
  const handlePrice57Change = (newPrice: number) => {
    dispatch({ type: "SET_PRICE_57", payload: newPrice });
  };
  const handlePrice810Change = (newPrice: number) => {
    dispatch({ type: "SET_PRICE_810", payload: newPrice });
  };
  const handlePrice1114Change = (newPrice: number) => {
    dispatch({ type: "SET_PRICE_1114", payload: newPrice });
  };
  const handlePrice1218Change = (newPrice: number) => {
    dispatch({ type: "SET_PRICE_1218", payload: newPrice });
  };
  const handlePrice1620Change = (newPrice: number) => {
    dispatch({ type: "SET_PRICE_1620", payload: newPrice });
  };
  const handlePrice1824Change = (newPrice: number) => {
    dispatch({ type: "SET_PRICE_1824", payload: newPrice });
  };
  const handlePrice2436Change = (newPrice: number) => {
    dispatch({ type: "SET_PRICE_2436", payload: newPrice });
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
      case "SET_PRICE_A5":
        return {
          ...state,
          price: {
            ...state.price,
            a5: action.payload,
          },
        };
      case "SET_PRICE_A4":
        return {
          ...state,
          price: {
            ...state.price,
            a4: action.payload,
          },
        };
      case "SET_PRICE_A3":
        return {
          ...state,
          price: {
            ...state.price,
            a3: action.payload,
          },
        };
      case "SET_PRICE_A2":
        return {
          ...state,
          price: {
            ...state.price,
            a2: action.payload,
          },
        };
      case "SET_PRICE_A1":
        return {
          ...state,
          price: {
            ...state.price,
            a1: action.payload,
          },
        };
      case "SET_PRICE_A0":
        return {
          ...state,
          price: {
            ...state.price,
            a0: action.payload,
          },
        };
      case "SET_PRICE_57":
        return {
          ...state,
          price: {
            ...state.price,
            size5x7: action.payload,
          },
        };
      case "SET_PRICE_810":
        return {
          ...state,
          price: {
            ...state.price,
            size8x10: action.payload,
          },
        };
      case "SET_PRICE_1114":
        return {
          ...state,
          price: {
            ...state.price,
            size11x14: action.payload,
          },
        };
      case "SET_PRICE_1218":
        return {
          ...state,
          price: {
            ...state.price,
            size12x18: action.payload,
          },
        };
      case "SET_PRICE_1620":
        return {
          ...state,
          price: {
            ...state.price,
            size16x20: action.payload,
          },
        };
      case "SET_PRICE_1824":
        return {
          ...state,
          price: {
            ...state.price,
            size18x24: action.payload,
          },
        };
      case "SET_PRICE_2436":
        return {
          ...state,
          price: {
            ...state.price,
            size24x36: action.payload,
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
    formData.append("price.a5", state.price.a5);
    formData.append("price.a4", state.price.a4);
    formData.append("price.a3", state.price.a3);
    formData.append("price.a2", state.price.a2);
    formData.append("price.a1", state.price.a1);
    formData.append("price.a0", state.price.a0);
    formData.append("price.size5x7", state.price.size5x7);
    formData.append("price.size8x10", state.price.size8x10);
    formData.append("price.size11x14", state.price.size11x14);
    formData.append("price.size12x18", state.price.size12x18);
    formData.append("price.size16x20", state.price.size16x20);
    formData.append("price.size18x24", state.price.size18x24);
    formData.append("price.size24x36", state.price.size24x36);
    return formData;
  }

  const [products, setProducts] = useState<Product[]>([]);

  //edit product

  const [formStatus, changeFormStatus] = useState(false);
  const [sendingMode, changeSendingMode] = useState("");

  function checkMode(mode: string) {
    resetForm();

    changeFormStatus(true);
    if (mode == "Add") {
      changeSendingMode("post");
    } else if (mode == "Edit") {
      changeSendingMode("put");
    }
  }

  function closeEdit() {
    changeFormStatus(false);
    resetForm();
  }

  function editProduct(
    id: number,
    name: string,
    digital: number,
    a5: number,
    a4: number,
    a3: number,
    a2: number,
    a1: number,
    a0: number,
    size5x7: number,
    size8x10: number,
    size11x14: number,
    size12x18: number,
    size16x20: number,
    size18x24: number,
    size24x36: number,
    photo
  ) {
    if (sendingMode == "put") {
      dispatch({ type: "SET_ID", payload: id });
    }
  
    handleNameChange(name);
    handlePriceDigitalChange(digital);



    // eslint-disable-next-line prefer-rest-params
    const argsArray = Array.from(arguments)

    let functionIndex = 0;

    for(let i = 3; i < 15; i++){
      handlePhysicalPrice[functionIndex](argsArray[i])
        functionIndex++;
    }


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
    closeEdit();
    changeSendingMode("");
    resetForm();
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
    closeEdit();
    changeSendingMode("");
    resetForm();
  };

  function resetForm() {
    handleNameChange("");
    handlePriceDigitalChange(0);

      handlePhysicalPrice.forEach(size => {
      size(0);
   });
  }

  const handlePhysicalPrice = [
    handlePriceA5Change,
    handlePriceA4Change,
    handlePriceA3Change,
    handlePriceA2Change,
    handlePriceA1Change,
    handlePriceA0Change,
    handlePrice57Change,
    handlePrice810Change,
    handlePrice1114Change,
    handlePrice1218Change,
    handlePrice1620Change,
    handlePrice1824Change,
    handlePrice2436Change,
  ]

  const sizeNames = [
    "a5",
    "a4",
    "a3",
    "a2",
    "a1",
    "a0",
    "size5x7",
    "size8x10",
    "size11x14",
    "size12x18",
    "size16x20",
    "size18x24",
    "size24x36"
  ]
  //delete product

  async function deleteProduct(id: number) {
    const response = await fetch(`http://localhost:5209/api/products/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setProducts((p) => p.filter((product) => product.id != id));
    }
  }


  const sizeInputs =  [] 
  
  for(let i = 0; i < handlePhysicalPrice.length; i++){
    sizeInputs.push(
      <div>
      <label htmlFor="">{sizeNames[i]}</label>
      <input
        type="number"
        required
        step="0.01"
        className="bg-gray-100/70 p-1 rounded-sm"
        onChange={(e) => handlePhysicalPrice[i](e.target.value)}
        value={state.price[sizeNames[i]]}
      ></input>
      </div>
    )
  }

  const sizePriceInfo = []

  for(let i = 0; i < sizeNames.length; i++){
    <div>
      {sizeNames[i]}: 
    </div>
  }


  return (
    <div className="flex flex-col p-5">
      <form
        className={`flex flex-col w-200 gap-5 p-5 bg-white left-1/2 -translate-x-1/2 top-10 ${
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
        <div className="self-end">
          <button
            className="btn-primary !p-2 flex"
            type="button"
            onClick={() => closeEdit()}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="text-center">Edit product</div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          required
          className="bg-gray-100/70 p-1 rounded-sm"
          value={state.name}
          onChange={(e) => handleNameChange(e.target.value)}
        ></input>
        <label htmlFor="">Price Digital</label>
        <input
          type="number"
          name="digital-price"
          required
          step="0.01"
          className="bg-gray-100/70 p-1 rounded-sm"
          onChange={(e) => handlePriceDigitalChange(e.target.value)}
          value={state.price.digital}
        ></input>
        <div>Physical</div>

      {sizeInputs}
        <label>Photo</label>
        <input
          type="file"
          name="photo"
          onChange={(e) => handlePhoto(e.target.files[0])}
        ></input>
        <div className="self-center">
          <button className="btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>

      <div className="self-center">
        <button className="btn-primary" onClick={() => checkMode("Add")}>
          Add product
        </button>
      </div>

      <div className="flex flex-row gap-2 p-5">
        {products.map((product) => (
          <div key={product.id} className="shadow-sm p-5 flex flex-col gap-4">
            <div className="font-semibold text-lg">{product.name}</div>
            <img
              className="object-scale-down rounded-md w-50"
              src={`http://localhost:5209/images/${product.photo}`}
              alt=""
            />
            <div>Digital: {product.price.digital}</div>
            
            <div className="flex flex-row">
            {sizeNames.map((e) => (
              <div>{e.replace("size", "")}: {product.price[e]}</div>
            ))}
            </div>


            <div className="buttons flex flex-row self-center gap-2">
              <button
                className="btn-primary !p-1 flex"
                onClick={function () {
                  checkMode("Edit");
                  editProduct(
                    product.id,
                    product.name,
                    product.price.digital,
                    product.price.a5,
                    product.price.a4,
                    product.price.a3,
                    product.price.a2,
                    product.price.a1,
                    product.price.a0,
                    product.price.size5x7,
                    product.price.size8x10,
                    product.price.size11x14,
                    product.price.size12x18,
                    product.price.size16x20,
                    product.price.size18x24,
                    product.price.size24x36,
                    product.photo
                  );
                }}
              >
                <span className="material-symbols-outlined">edit</span>
              </button>
              <button
                className="btn-primary !p-1 flex"
                onClick={function () {
                  checkMode("Add");
                  editProduct(
                    product.id,
                    product.name,
                    product.price.digital,
                    product.price.a5,
                    product.price.a4,
                    product.price.a3,
                    product.price.a2,
                    product.price.a1,
                    product.price.a0,
                    product.price.size5x7,
                    product.price.size8x10,
                    product.price.size11x14,
                    product.price.size12x18,
                    product.price.size16x20,
                    product.price.size18x24,
                    product.price.size24x36,
                    product.photo
                  );
                }}
              >
                <span className="material-symbols-outlined">content_copy</span>
              </button>
              <button
                className="btn-primary !p-1 flex"
                onClick={() => deleteProduct(product.id)}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
