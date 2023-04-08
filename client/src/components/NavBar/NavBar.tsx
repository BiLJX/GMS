import { NavLink } from "react-router-dom"
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import InsertChartOutlinedSharpIcon from '@mui/icons-material/InsertChartOutlinedSharp';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
export default function NavBar(){
    return(
        <nav className="h-[100vh] w-[var(--nav-size)] fixed top-0 left-0 bg-[#2E313F] flex flex-col">
            <div className="p-4 text-center">
                <h1 className="text-3xl font-bold text-white-100">Simple<span className="text-primary-200"> GMS</span></h1>
            </div>
            <div className="flex flex-col mt-4">
                <NavItem label="Dashboard" to = "/" Icon={GridViewOutlinedIcon} />
                <NavItem label="Members" to = "/members" Icon={Groups2OutlinedIcon} />
                <NavItem label="Membership Types" to = "/membership" Icon={PeopleAltOutlinedIcon} />
                <NavItem label="Analytics" to = "/analytics" Icon={InsightsOutlinedIcon} />
            </div>
        </nav>
    )
}
interface NavProps {
    label: string,
    Icon: any,
    to: string
}
function NavItem({
    label,
    Icon,
    to
}: NavProps){
    return(
        <NavLink to = {to} className={({isActive})=>`flex px-6 py-3 space-x-4 items-center ${isActive?'text-white-100':'text-white-400'}`}>
            <div className="flex items-center justify-center"><Icon style = {{fontSize: "1.8rem"}} /></div>
            <div className="text-[18px]">{label}</div>
        </NavLink>
    )
}