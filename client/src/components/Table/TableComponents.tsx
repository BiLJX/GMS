
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
        <table style={style} className={"w-full text-sm mt-2 overflow-hidden border-collapse rounded-t-lg "+className}>
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

function TEditButton(){
    return(
        <button></button>
    )
}

function isEven(n: number){
    return n%2 === 0;
}