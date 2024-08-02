import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    rating: number;
    images: string[];
}

const ProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (id) {
            axios
                .get<Product>(`https://dummyjson.com/products/${id}`)
                .then((response) => {
                    setProduct(response.data);
                })
                .catch((error) => {
                    console.error(`Error fetching product data: ${error}`);
                });
        }
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className="p-5 w-[60%] mt-5">
            <button
                onClick={() => navigate(-1)}
                className="mb-5 px-2 bg-black text-white rounded"
            >
                Back
            </button>

            <img
                src={product.images[0]}
                alt={product.title}
                className="w-[40%] h-auto mb-5"
            />

            <h1 className="text-2xl mb-4 font-bold">{product.title}</h1>
            <p className="mb-4 text-gray-700 w-[78%]">{product.description}</p>
            <div className="flex">
                <p>Price: €{product.price}</p>
                <p className="ml-10">Rating: {product.rating}</p>
            </div>
        </div>
    );
};

export default ProductPage;
