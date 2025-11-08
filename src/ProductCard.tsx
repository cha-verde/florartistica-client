import React from "react";
import './ProductCard.css'

type ProductCardProps = {
    id: number;
    name: string;
    price: {
      digital: number;
      physical: number;
    };
    photo: string[];
  };

const ProductCard: React.FC<ProductCardProps> = ({id, name, price, photo}) => {
    console.log(name)
    return(
        <div className="w-full bg-white p-5 text-center text-black flow rounded-lg shadow-md transform transition-transform duration-200 hover:-translate-y-1" key={id}>
            <div className="w-2xs h-2xs">
            <img className="object-scale-down rounded-md" src={`http://localhost:5209/images/${photo}`} alt="" />
            </div>
            <div className="font-semibold text-2xl">{name}</div>
            <div className="text-xl">${price.digital}</div>
        </div>
    )
}

export default ProductCard