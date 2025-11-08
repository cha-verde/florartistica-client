import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

function ProductDetails(){

    const id = useParams();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5209/api/Products/${id.id}`)
          .then(res => res.json())
          .then(function(data){
            setProduct(data)
          } );
      }, [id]);

      if (!product) return <p>Loading...</p>;

    return(
        <div className="bg-black">
            <div>{product.name}</div>
        </div>
    )
}

export  default ProductDetails