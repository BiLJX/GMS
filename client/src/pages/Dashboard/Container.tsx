export function MetricContainer({children, className = "", style}: {children: any, className?: string, style?: React.CSSProperties}){
    return(
        <div className={"p-4 bg-white-100 border-[1px] border-brc-300 rounded-lg "+className} style={style}>{children}</div>
    )
}