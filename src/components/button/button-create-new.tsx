import Link from "next/link";

interface ButtonProps {
    children: React.ReactNode
    width?: string
    height?: string
    href: string
}

export const ButtonCreateNew = ({ 
    children, 
    width = '200px',
    height = '50px',
    href
}: ButtonProps) => {
    return (
        <Link 
            href={href}
            className="flex items-center justify-center bg-[#585dff] text-white border border-[#e0e0e0] rounded-lg shadow-sm cursor-pointer"
            style={{
                width,
                height,
            }}
        >
            {children}
        </Link>
    )
}