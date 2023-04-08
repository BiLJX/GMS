interface Props {
    children: any,
    style?: React.CSSProperties
}
export default function Main({children}: Props){
    return(
        <div style={{paddingLeft: "calc(var(--nav-width) + 2rem)"}} className="pr-8 py-2">
            {children}
        </div>
    )
}