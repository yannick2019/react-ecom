import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface SpotlightButtonProps {
    handleResetFilters?: () => void;
    title: string;
}

const SpotlightButton = ({
    handleResetFilters,
    title,
}: SpotlightButtonProps) => {
    const btnRef = useRef<HTMLButtonElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const buttonElement = btnRef.current;

        const handleMouseMove = (e: MouseEvent) => {
            const { width } = (
                e.target as HTMLButtonElement
            ).getBoundingClientRect();
            const offset = e.offsetX;
            const left = `${(offset / width) * 100}%`;

            spanRef.current?.animate(
                { left },
                { duration: 250, fill: "forwards" }
            );
        };

        const handleMouseLeave = () => {
            spanRef.current?.animate(
                { left: "50%" },
                { duration: 100, fill: "forwards" }
            );
        };

        btnRef.current?.addEventListener("mousemove", handleMouseMove);
        btnRef.current?.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            buttonElement?.removeEventListener("mousemove", handleMouseMove);
            buttonElement?.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <motion.button
            whileTap={{ scale: 0.985 }}
            ref={btnRef}
            onClick={handleResetFilters}
            className="relative w-full max-w-xs overflow-hidden rounded-lg bg-slate-950 px-4 py-3 text-lg font-medium text-white"
        >
            <span className="pointer-events-none relative z-10 mix-blend-difference">
                {title}
            </span>
            <span
                ref={spanRef}
                className="pointer-events-none absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[50%] rounded-full bg-slate-100"
            />
        </motion.button>
    );
};

export default SpotlightButton;
