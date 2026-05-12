import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../axios";

const Product = () => {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8080/api/products/${id}`
                );
                console.log(res.data)
                setProduct(res.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);


    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center mt-20 text-gray-600 dark:text-gray-300">
                Product not found
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="grid md:grid-cols-2 gap-10 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow">

                {/* LEFT - IMAGE (placeholder) */}
                <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-800 rounded-xl h-[350px]">
                    <span className="text-gray-400">Product Image</span>
                </div>

                {/* RIGHT - DETAILS */}
                <div className="flex flex-col justify-between">
                    <div>
                        <p className="text-sm text-gray-500">{product.category}</p>

                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">
                            {product.name}
                        </h1>

                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {product.brand}
                        </p>

                        <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    {/* PRICE + ACTION */}
                    <div className="mt-6">

                        <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-blue-600">
                ₹{product.price}
              </span>

                            <span
                                className={`text-sm font-semibold ${
                                    product.available
                                        ? "text-green-500"
                                        : "text-red-500"
                                }`}
                            >
                {product.available ? "In Stock" : "Out of Stock"}
              </span>
                        </div>

                        {/* STOCK */}
                        <p className="text-sm text-gray-500 mt-2">
                            Stock: {product.stockQuantity}
                        </p>

                        {/* DATE */}
                        <p className="text-sm text-gray-400 mt-1">
                            Listed on:{" "}
                            {new Date(product.releaseDate).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>

                        {/* BUTTONS */}
                        <div className="flex gap-4 mt-6">

                            <button
                                disabled={!product.productAvailable}
                                className={`px-5 py-2 rounded-lg text-white transition ${
                                    product.available
                                        ? "bg-blue-600 hover:bg-blue-700"
                                        : "bg-gray-400 cursor-not-allowed"
                                }`}
                            >
                                {product.available
                                    ? "Add to Cart"
                                    : "Out of Stock"}
                            </button>

                            <button
                                className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800">
                                Update
                            </button>

                            <button
                                className="px-5 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-gray-800">
                                Delete
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Product;