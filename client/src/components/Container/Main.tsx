interface Props {
    children: any,
    style?: React.CSSProperties,
    className?: string
}
export default function Main({children, style, className}: Props){
    return(
        <div style={{paddingLeft: "calc(var(--nav-width) + 2rem)", ...style}} className={"pr-8 py-4 "+className}>
            {children}
        </div>
    )
}