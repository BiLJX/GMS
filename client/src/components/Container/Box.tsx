export function Box({children, className = "", style}: {children: any, className?: string, style?: React.CSSProperties}){
    return(
        <div className={"p-5 bg-white-100  rounded-lg "+className} style={style}>{children}</div>
    )
}