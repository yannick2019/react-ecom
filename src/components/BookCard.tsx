import { Link } from "react-router-dom";

interface BookCardProps {
    id: string;
    title: string;
    image: string;
    price: number;
}

const BookCard: React.FC<BookCardProps> = ({ id, title, image, price }) => {
    return (
        <div className="border p-4 rounded">
            <Link to={`/product/${id}`}>
                <img
                    src={image}
                    alt={title}
                    className="w-full h-32 object-cover mb-2"
                />
            </Link>

            <h2 className="font-bold mb-2">{title}</h2>
            <span className="mt-2 px-2 py-1 bg-black text-white text-center">
                €{price}
            </span>
        </div>
    );
};

export default BookCard;
