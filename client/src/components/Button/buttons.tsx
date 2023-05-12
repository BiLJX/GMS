

interface ButtonProps {
    children: string;
    onClick?: ()=>void;
    style?: React.CSSProperties;
    color?: string;
    loading?: boolean;
    loadingLabel?: string;
    disabled?: boolean
}
export function SimpleButton({
    children,
    onClick,
    style,
    color,
    loading,
    disabled,
    loadingLabel
}:ButtonProps){
    return(
        <button 
        style={style} 
        disabled = {disabled || loading} 
        className={`bg-primary-200 text-white-100 py-[.4em] rounded-lg text-lg disabled:opacity-50 `}
        onClick={onClick}
        >
            {loading?(loadingLabel || "loading..."):children}
        </button>
    )
}

interface TwoButtonProps extends ButtonProps {
    cancelLabel: string,
    onCancel?: ()=>void;
}
export function TwoButton({
    cancelLabel,
    children,
    color,
    loading,
    loadingLabel,
    onCancel,
    onClick,
    style
}: TwoButtonProps){
    return(
        <div className = "flex flex-row">
            <button onClick={onCancel} className="flex-1 text-gray-400">{cancelLabel}</button>
            <button disabled = {loading} onClick={onClick} className={`flex-1 text-white-100 bg-primary-200 py-2 rounded-lg disabled:opacity-50`}>{loading?loadingLabel:children}</button>
        </div>
    )
}