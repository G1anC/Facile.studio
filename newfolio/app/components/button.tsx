
type ButtonProps = {
    text: string;
    icon: string;
    func: () => void;
};

const Button = ({ text, icon, func }: ButtonProps) => {
    return (
        <div
            onClick={func}
            className="
                bg-[#CAE6D8] hover:bg-[#1E1E1E]
                text-[#1E1E1E] hover:text-[#CAE6D8]
                border-2 border-[#1E1E1E] rounded-full
                px-6 py-3
                duration-150 transition-colors
                flex gap-2 items-center
                cursor-pointer
            "
        >
            <img src={`/icons/${icon}.svg`} alt={icon} width={20} height={20} />
            <span>{text}</span>
        </div>
    );
};

export default Button;