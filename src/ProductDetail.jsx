import React, { Component } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import { GetSingleProduct } from "./ProductApi";
import Loading from "./Loading";
import NotFound from "./NotFound";
import { FaPlus, FaMinus } from "react-icons/fa";
import { withCart } from "./withProvider";
import {withParams} from "./withParams"; // Import the HOC

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartValue: 1,
      product: null,
      PageLoading: true,
    };
  }

  componentDidMount() {
    const id = +this.props.params.id;
    this.fetchProduct(id);
  }

  componentDidUpdate(prevProps) {
    const currentId = +this.props.params.id;
    const prevId = +prevProps.params.id;

    if (currentId !== prevId) {
      this.setState({ PageLoading: true });
      this.fetchProduct(currentId);
    }
  }

  fetchProduct(id) {
    GetSingleProduct(id)
      .then((response) => {
        this.setState({ product: response, PageLoading: false });
      })
      .catch((err) => {
        console.error("API mein kuch error hai", err);
        this.setState({ PageLoading: false });
      });
  }

  handleCart = () => {
    const { cartValue } = this.state;
    const id = +this.props.params.id;
    this.props.handleAddToCart(id, cartValue);
    this.setState({ cartValue: 1 });
  };

  render() {
    const { cartValue, product, PageLoading } = this.state;
    const id = +this.props.params.id;

    if (PageLoading) {
      return <Loading />;
    }

    if (!product) {
      return <NotFound />;
    }

    return (
      <>
        <div>
          <Link to={"/"}>
            <IoMdArrowRoundBack className="text-xl sm:text-3xl font-semibold ml-4 " />
          </Link>
        </div>

        <div className="px-2 w-fit h-200 flex border-2 sm:p-4 gap-4 shadow-lg rounded-md sm:mx-auto sm:h-200 bg-white md:h-100 md:mx-auto lg:mx-auto ">
          <div className="mr-2 w-1/2 px-6 py-2">
            <img
              className="w-60 h-80 sm:w-80 sm:h-96 object-cover"
              src="https://images.unsplash.com/photo-1695322353008-fb6647b1cf4a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Product Image"
            />
          </div>

          <div className="flex flex-col items-start space-y-2 w-1/2 h-full lg:p-4">
            <h2 className="text-sm sm:text-4xl  text-gray-600 mt-4 mb-2">
              {product.title}
            </h2>
            <p className="text-sm sm:text-2xl text-gray-600 font-bold">
              ${product.price}
            </p>
            <p className="text-sm text-gray-600 font-semibold sm:text-base">
              {product.description}
            </p>

            <p className="text-sm text-gray-600 font-semibold sm:text-base">
              <span className="text-orange-600">Brand: </span>{product.brand}
            </p>

            <p className="text-sm text-gray-600 font-semibold sm:text-base">
              <span className="text-orange-600">Discount: </span>
              {product.discountPercentage}%
            </p>

            <p className="text-sm text-gray-600 font-semibold sm:text-base">
              <span className="text-orange-600">Category: </span>
              {product.category}
            </p>

            <div className="flex gap-4">
              <div className="flex gap-2">
                {cartValue >= 1 && (
                  <button
                    onClick={() => this.setState({ cartValue: cartValue - 1 })}
                    className="font-bold text-orange-700 border-2 border-black rounded-md px-1 hover:shadow-md hover:bg-orange-300 text-sm sm:px-2 lg:px-1 h-10 sm:text-sm"
                  >
                    <FaMinus />
                  </button>
                )}
                <span className="text-center text-lg font-bold text-orange-700 border-2 border-black rounded-md px-2 h-10 sm:text-xl sm:py-0.5">
                  {cartValue}
                </span>
                <button
                  onClick={() => this.setState({ cartValue: cartValue + 1 })}
                  className="px-1 font-bold text-orange-700 border-2 border-black rounded-md hover:shadow-md hover:bg-orange-300 text-sm sm:px-1 lg:px-1.5 h-10 sm:text-sm"
                >
                  <FaPlus />
                </button>
              </div>

              <button
                onClick={this.handleCart}
                className="text-sm px-2 mr-4 sm:px-6 md:py-1 lg:px-6 lg:py-1 rounded-md bg-red-500 text-white"
              >
                ADD TO CART
              </button>
            </div>

            <div className="flex gap-5 mt-8">
              {id > 1 && (
                <Link
                  to={`/productDetail/${id - 1}`}
                  className="flex gap-2 items-center"
                  onClick={() => this.setState({ cartValue: 1, PageLoading: true })}
                >
                  <IoMdArrowRoundBack className="text-sm sm:text-xl font-semibold" />
                  <span className="text-sm sm:text-xl font-semibold">
                    previous
                  </span>
                </Link>
              )}
              <Link
                to={`/productDetail/${id + 1}`}
                className="flex gap-2 items-center"
                onClick={() => this.setState({ cartValue: 1, PageLoading: true })}
              >
                <span className="text-sm sm:text-xl font-semibold">next</span>
                <IoMdArrowRoundForward className="text-sm sm:text-xl font-semibold" />
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withCart(withParams(ProductDetail));
