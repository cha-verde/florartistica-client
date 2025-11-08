import { useState, useEffect, useReducer } from "react";
import type { Product } from './Product'
import "./Products.css"

function Products(){


    const initialProduct: Product = {
        id: 0,
        name: "",
        price: {
          digital: 0,
          physical: 0,
        },
        photo: [""],
      };
    
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
        dispatch({type: "SET_PHOTO", payload: file})
      }
    
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
    
      const [products, setProducts] = useState<Product[]>([]);
    



     //upload product

    const uploadProduct = async (e) => {
        e.preventDefault();
    
        const formData = new FormData()
        formData.append("name", state.name)
        formData.append("photo", state.photo)
        formData.append("price.digital", state.price.digital)
        formData.append("price.physical", state.price.physical)
    
        await fetch("http://localhost:5209/api/products/", {
            method: "POST",
            body: formData
          });
    
            fetch("http://localhost:5209/api/Products")
              .then((res) => res.json())
              .then((data) => setProducts(data))
              .catch((err) => console.error(err));

        e.target.reset();
    }
    
    async function deleteProduct(id: number) {
        
        const response = await fetch(`http://localhost:5209/api/products/${id}`, {
            method: "DELETE",
          });
        
        if(response.ok){
            setProducts(p => p.filter(product => product.id != id))
        }
         
    }
    
      useEffect(() => {
        fetch("http://localhost:5209/api/Products")
          .then((res) => res.json())
          .then((data) => setProducts(data))
          .catch((err) => console.error(err));
      }, []);
      
      return (
        <div className="flex flex-row">
            <div className="flex w-lg flex-row gap-2 p-5">
            {products.map((product) => (
              <div className="shadow-sm p-5">
                <div>{product.name}</div>
                <img className="object-scale-down rounded-md w-50" src={`http://localhost:5209/images/${product.photo}`} alt="" />
                <div>Digital: {product.price.digital}</div>
                <div>Physical: {product.price.physical}</div>
                <button onClick={() => deleteProduct(product.id)}>Remove</button>
              </div>
            ))}
            </div>

          <div className="shadow-lg rounded-md p-10">
            <form className="flex flex-col gap-2" onSubmit={(e) => uploadProduct(e)}>
              <div className="text-center">Add a product</div>
              <label>Name</label>
              <input
                type="text" className="bg-gray-100/70 p-1 rounded-sm" 
                onChange={(e) => handleNameChange(e.target.value)}
              ></input>
              <label htmlFor="">Price Digital</label>
              <input
                type="number" className="bg-gray-100/70 p-1 rounded-sm" 
                onChange={(e) => handlePriceDigitalChange(e.target.value)}
              ></input>
              <label htmlFor="">Price Physical</label>
              <input
                type="number" className="bg-gray-100/70 p-1 rounded-sm" 
                onChange={(e) => handlePricePhysicalChange(e.target.value)}
              ></input>
              <label>Photo</label>
              <input type="file" onChange={(e) => handlePhoto(e.target.files[0])}></input>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      );
}

export default Products