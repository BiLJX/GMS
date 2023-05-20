import { NavLink } from "react-router-dom"
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import PieChartOutlinedIcon from '@mui/icons-material/PieChartOutlined';

export default function NavBar(){
    return(
        <nav className="h-[100vh] w-[var(--nav-width)] fixed top-0 left-0 bg-[#2E313F] flex flex-col z-20">
            <div className="p-4 text-center">
                <h1 className="text-3xl font-bold text-white-100">Simple<span className="text-primary-200"> GMS</span></h1>
            </div>
            <div className="flex flex-col mt-4">
                <NavItem label="Dashboard" to = "/" Icon={GridViewOutlinedIcon} />

                <div className="text-gray-200 px-6 pt-4 text-sm">Management</div>

                <NavItem label="Members" to = "/members" Icon={Groups2OutlinedIcon} />
                <NavItem label="Membership Types" to = "/membership" Icon={PeopleAltOutlinedIcon} />
                <NavItem label="Addons" to = "/addons" Icon={NoteAddOutlinedIcon} />

                <div className="text-gray-200 px-6 pt-4 text-sm">Reports</div>

                <NavItem label="Sales" to = "/reports/sales" Icon={PointOfSaleOutlinedIcon} />
                <NavItem label="Members" to = "/reports/members" Icon={InsightsOutlinedIcon} />
                <NavItem label="Breakdown" to = "/reports/breakdown" Icon={PieChartOutlinedIcon} />
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
            <div className="flex items-center justify-center"><Icon style = {{fontSize: "1.4rem"}} /></div>
            <div className="text-sm">{label}</div>
        </NavLink>
    )
}

