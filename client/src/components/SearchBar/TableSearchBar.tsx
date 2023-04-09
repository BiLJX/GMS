import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
interface SearchBarProps {
    style?: React.CSSProperties,
    onSearch?: (value: string)=>void;
}
export default function TableSearchBar({
    style,
    onSearch
}: SearchBarProps){
    return(
        <div style={style} className='border-gray-100 border-[1px] rounded-lg flex items-center h-[35px] px-2 space-x-2'>
            <SearchOutlinedIcon className='text-gray-200' />
            <input className='flex-1 text-sm' placeholder='Search...' onChange = {e=>onSearch?.(e.target.value)} />
        </div>
    )
}