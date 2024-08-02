import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import SpotlightButton from "./custom/SpotlightButton";

interface Product {
    category: string;
}

interface FetchResponse {
    products: Product[];
}

const Sidebar = () => {
    const {
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        setKeyword,
    } = useFilter();
    const [categories, setGategories] = useState<string[]>([]);
    const [keywords] = useState<string[]>([
        "apple",
        "watch",
        "Fashion",
        "trend",
        "shoes",
        "shirt",
    ]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://dummyjson.com/products");
                const data: FetchResponse = await response.json();

                const uniqueCategories = Array.from(
                    new Set(data.products.map((product) => product.category))
                );

                setGategories(uniqueCategories);
            } catch (error) {
                console.error("Error fetching product", error);
            }
        };

        fetchCategories();
    }, []);

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMinPrice(value ? parseFloat(value) : undefined);
    };

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMaxPrice(value ? parseFloat(value) : undefined);
    };

    const handleRadioChangeCategories = (category: string) => {
        setSelectedCategory(category);
    };

    const handleKeywordClick = (keyword: string) => {
        setKeyword(keyword);
    };

    const handleResetFilters = () => {
        setSearchQuery("");
        setSelectedCategory("");
        setMinPrice(undefined);
        setMaxPrice(undefined);
        setKeyword("");
    };

    return (
        <div className="w-72 p-5 h-screen">
            <h1 className="text-3xl font-bold mb-10 mt-4">Koniya Store </h1>
            <section className="w-64">
                <input
                    type="text"
                    className="border-2 rounded px-2 py-3 w-full sm:mb-0"
                    placeholder="Search Product"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <div className="flex justify-between mt-3 items-center gap-2">
                    <input
                        type="text"
                        className="border-2 px-5 py-3 mb-3 w-full"
                        placeholder="Min price"
                        value={minPrice ?? ""}
                        onChange={handleMinPriceChange}
                    />
                    <input
                        type="text"
                        className="border-2 px-5 py-3 mb-3 w-full"
                        placeholder="Max price"
                        value={maxPrice ?? ""}
                        onChange={handleMaxPriceChange}
                    />
                </div>

                {/* Categories Section */}
                <div className="mb-5">
                    <h2 className="text-xl font-semibold mb-3">Categories</h2>
                </div>

                {categories &&
                    categories.map((category, index) => (
                        <label key={index} className="block mb-2">
                            <input
                                type="radio"
                                name="category"
                                value={category}
                                onChange={() =>
                                    handleRadioChangeCategories(category)
                                }
                                className="mr-2 w-[16px] h-[16px]"
                                checked={selectedCategory === category}
                            />
                            {category.toUpperCase()}
                        </label>
                    ))}
            </section>

            {/* Keywords Section */}
            <section className="w-64">
                <div className="mb-5 mt-4">
                    <h2 className="text-xl font-semibold mb-3">Keywords</h2>
                    <div>
                        {keywords.map((keyWord, index) => (
                            <button
                                key={index}
                                onClick={() => handleKeywordClick(keyWord)}
                                className="block mb-2 px-4 w-full text-left border rounded hover:bg-gray-200"
                            >
                                {keyWord.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                <SpotlightButton
                    handleResetFilters={handleResetFilters}
                    title="Reset Filters"
                />
                {/* <button
                    onClick={handleResetFilters}
                    className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5"
                >
                    Reset Filters
                </button> */}
            </section>
        </div>
    );
};

export default Sidebar;
