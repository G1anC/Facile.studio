import { useState } from "react";

type ContactModalProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ContactModal = ({ open, setOpen }: ContactModalProps) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form data submitted:", formData);
        setOpen(false); // close modal after submit
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-[#111111]/75 flex items-center justify-center">
            <div className="bg-[#CAE6D8] p-16 rounded-[32px] w-full max-w-xl flex flex-col gap-8 text-[#1e1e1e] relative">
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-8 left-8 cursor-pointer text-[#1E1E1E]"
                >
                    <img src={"/icons/arrow.svg"} alt="arrow" width={20} height={20} />
                </button>

                <img
                    alt="Facile"
                    src="/icons/HIRE US.svg"
                    className="h-20 mx-auto mb-5"
                />

                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                    <div className="relative w-full">
                        <div className="absolute bg-[#CAE6D8] px-4 left-5 top-0 -translate-y-1/2">
                            Name
                        </div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Jane Doe"
                            value={formData.name}
                            onChange={handleChange}
                            className="p-4 text-center w-full rounded-full border border-[#1E1E1E]/20 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="relative w-full">
                        <div className="absolute bg-[#CAE6D8] px-4 left-5 top-0 -translate-y-1/2">
                            Email
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="jane.doe@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="p-4 w-full text-center rounded-full border border-[#1E1E1E]/20 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="relative w-full">
                        <div className="absolute bg-[#CAE6D8] px-4 left-5 top-0 -translate-y-1/2">
                            Phone
                        </div>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="+00 1 23 45 67 89"
                            value={formData.phone}
                            onChange={handleChange}
                            className="p-4 w-full text-center rounded-full border border-[#1E1E1E]/20 focus:outline-none"
                        />
                    </div>
                    <div className="relative w-full">
                        <div className="absolute bg-[#CAE6D8] px-4 left-5 top-0 -translate-y-1/2">
                            Message
                        </div>
                        <textarea
                            name="message"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleChange}
                            className="p-4 w-full text-center rounded-3xl border border-[#1E1E1E]/20 h-48 resize-none focus:outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-[#1E1E1E] text-[#CAE6D8] py-3 rounded-full hover:bg-[#333] transition"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactModal;
