import { SimpleButton } from "components/Button/buttons";

interface TableProps {
    children?: any,
    style?: React.CSSProperties,
    className?: string
}
export default function Table({
    children,
    style,
    className = ""
}: TableProps){
    return(
        <table style={style} className={"text-sm w-full mt-2 overflow-hidden border-collapse rounded-t-lg "+className}>
           {children}
        </table>
    )
}
export function Th({children, style, className}: TableProps){
    return(
        <th className={"p-3 font-medium text-left"+(className||"")} style={style}>{children}</th>
    )
}

export function Thead({children, style, className = ""}: TableProps){
    return(
        <thead className={"bg-primary-200 "+className} style={style}>
            <tr>{children}</tr>
        </thead>
    )
}

interface TrProps extends TableProps {
    index: number;
}
export function Tr({
    children,
    className = "",
    style,
    index
}: TrProps){
    return (
        <tr className={`border-b-[1px] border-gray-100 ${isEven(index)?"bg-white-300":"bg-white-100"}` + className} style={style}>
            {children}
        </tr>
    )
}

export function Td({
    children,
    className = "",
    style,
}: TableProps){
    return(
        <td className={"m-0 font-medium py-6 px-3 "+className} style={style}>{children}</td>
    )
}

interface ButtonProps {
    style?: React.CSSProperties;
    onClick?: ()=>void;
}
export function TEditButton({style, onClick}:ButtonProps){
    return(
        <SimpleButton onClick={onClick} style={{
            backgroundColor: "#FFC859",
            height: "25px",
            fontSize: ".9rem",
            padding: "0 .8rem",
            ...style
        }}>EDIT</SimpleButton>
    )
}

export function TDeleteButton({style, onClick}:ButtonProps){
    return(
        <SimpleButton onClick={onClick} style={{
            height: "25px",
            fontSize: ".9rem",
            padding: "0 1rem",
            ...style
        }}>Delete</SimpleButton>
    )
}

function isEven(n: number){
    return n%2 === 0;
}