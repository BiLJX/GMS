interface Props {
    children: any,
    style?: React.CSSProperties
}
export default function Main({children, style}: Props){
    return(
        <div style={{paddingLeft: "calc(var(--nav-width) + 2rem)", ...style}} className="pr-8 py-2">
            {children}
        </div>
    )
}