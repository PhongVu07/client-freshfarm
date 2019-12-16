import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/category.css";
import Navibar from "../components/Navibar";
import StarRatingSm from "../components/StarRatingSm";
import onestar from "../img/1star.png";
import twostar from "../img/2star.png";
import threestar from "../img/3star.png";
import fourstar from "../img/4star.png";
import fivestar from "../img/5star.png";

export default function Categories(props) {
  const { category } = useParams();
  const [products, setProducts] = useState(null);
  const [title, setTitle] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const getCategoryProdcut = props.getCategoryProdcut;

  useEffect(() => {
    getProduct();
    getCategoryProdcut(categoryId);
  }, []);

  useEffect(() => {
    getCategoryProdcut(categoryId);
  }, [categoryId]);

  useEffect(() => {
    getProduct();
  }, [getCategoryProdcut]);

  const getProduct = () => {
    //   console.log(category);
    if (category === "Fruit") {
      setProducts(props.fruit);
      setTitle("Fruit");
      setCategoryId(1);
      return;
    } else if (category === "Vegetable") {
      setProducts(props.vegetable);
      setTitle("Vegetable");
      setCategoryId(2);
      return;
    } else if (category === "Seasoning") {
      setProducts(props.seasoning);
      setTitle("Seasoning");
      setCategoryId(3);
      return;
    }
    setProducts(props.filteredProduct.product);
    setTitle(`All query result:`);
    setCategoryId(0);
  };

  const filterShow = price => {
    if (price === "asc") {
      const new_products = [...products].sort((a, b) => a.price - b.price);
      setProducts(new_products);
      setTitle(...title.concat(" Price Ascending"));
      return;
    } else {
      const new_products = [...products].sort((a, b) => b.price - a.price);
      setProducts(new_products);
      setTitle(...title.concat(" Price descending"));
      return;
    }
  };

  return (
    <div className="container-fluid">
      <Navibar
        currentUser={props.currentUser}
        setCurrentUser={props.setCurrentUser}
        numItemInCart={props.numItemInCart}
        filteredProduct={props.filteredProduct}
        setFilteredProduct={props.setFilteredProduct}
      />

      <div>
        <div className="container d-flex mt-2">
          <div className="ff-filter-panel">
            <div className="search-filter-status">
              <div className="search-filter-status-text">FILTER</div>
            </div>
            <div className="ff-filter-group">
              <div className="ff-filter-group-header">Rating</div>
              <div className="ff-filter-group-body">
                <div className="ff-filter-group-star">
                  <div className="ff-filter-group-star-container mb-3">
                    <img
                      src={fivestar}
                      alt="5 star"
                      className="ff-filter-star"
                    />
                    <div className="">and above</div>
                  </div>
                  <div className="ff-filter-group-star-container mb-3">
                    <img
                      src={fourstar}
                      alt="5 star"
                      className="ff-filter-star"
                    />
                    <div className="">and above</div>
                  </div>
                  <div className="ff-filter-group-star-container mb-3">
                    <img
                      src={threestar}
                      alt="5 star"
                      className="ff-filter-star"
                    />
                    <div className="">and above</div>
                  </div>
                  <div className="ff-filter-group-star-container mb-3">
                    <img
                      src={twostar}
                      alt="5 star"
                      className="ff-filter-star"
                    />
                    <div className="">and above</div>
                  </div>
                  <div className="ff-filter-group-star-container">
                    <img
                      src={onestar}
                      alt="5 star"
                      className="ff-filter-star"
                    />
                    <div className="">and above</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ff-filter-group">
              <div className="ff-filter-btn" onClick={() => filterShow("asc")}>
                Low to high price
              </div>
              <div className="ff-filter-btn" onClick={() => filterShow("dsc")}>
                High to low price
              </div>
            </div>
            <div className="ff-filter-group">
              <div
                className="ff-filter-btn ff-filter-btn-clear"
                onClick={getProduct}
              >
                Clear all
              </div>
            </div>
          </div>

          {products ? (
            <div className="category-section">
              <div className="category-result">
                <h4>{title}</h4>
                <div className="row row-cols-1 row-cols-md-4 mt-1">
                  {products &&
                    products.map(product => {
                      return (
                        <Link
                          to={`/product/${product.id}`}
                          key={product.id}
                          className="col-md-2 col-3 home-product-card"
                        >
                          <div className="card h-100 home-product-card-border">
                            <div className="product-card-img">
                              <img
                                src={product.img_url}
                                className="card-img-top"
                                alt="..."
                              />
                            </div>
                            <div className="card-body product-card-body">
                              <Link
                                to={`/product/${product.id}`}
                                className="card-title"
                              >
                                {product.name}
                              </Link>
                              <div className="row d-flex justify-content-between mt-2">
                                <p className="ff-price">₫{product.price}</p>
                                <p className="title-small">
                                  {product.store_name}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </div>
            </div>
          ) : (
            <div><p>Sorry nothing like you're looking for</p></div>
          )}
        </div>
      </div>
    </div>
  );
}
