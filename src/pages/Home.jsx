import React, {
  useEffect,
  useState,
} from "react";

import API from "../services/api";
import ProductCard from "../components/ProductCard";

function Home() {

  const [products, setProducts] =
    useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    try {

      const response =
        await API.get("products/");

      setProducts(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="container mt-4">

      <div className="row">

        {products.map((product) => (

          <div
            key={product.id}
            className="col-md-4 mb-4"
          >
            <ProductCard
              product={product}
            />
          </div>

        ))}

      </div>

    </div>
  );
}

export default Home;