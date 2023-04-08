

interface ButtonProps {
    children: string;
    onClick?: ()=>void;
    style?: React.CSSProperties;
    color?: string;
    loading?: boolean;
    loadingLabel?: string
}
export function SimpleButton({
    children,
    onClick,
    style,
    color,
    loading,
    loadingLabel
}:ButtonProps){
    return(
        <button style={style} disabled = {loading} className={`bg-primary-200 text-white-100 py-[.4em] rounded-lg text-lg disabled:opacity-50 `}>{loading?(loadingLabel || "loading..."):children}</button>
    )
}