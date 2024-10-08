import NavBar from "components/NavBar/NavBar";
import AddAddon from "pages/Addons/AddAddon";
import AddonsPage from "pages/Addons/AddonsPage";
import EditAddon from "pages/Addons/EditAddon";
import DashboardPage from "pages/Dashboard/DashboardPage";
import MemberByIdPage from "pages/MemberById/MemberByIdPage";
import CreateMemberPage from "pages/Members/CreateMemberPage";
import EditMemberPage from "pages/Members/EditMemberPage";
import Members from "pages/Members/Members";
import RenewPage from "pages/Members/RenewPage";
import CreateMembershipType from "pages/MembershipTypes/CreateMembershipType";
import EditMembershipType from "pages/MembershipTypes/EditMembershipType";
import MembershipTypes from "pages/MembershipTypes/MembershipTypes";
import BreakdownReportPage from "pages/Reports/BreakdownPage";
import MembersReportPage from "pages/Reports/MembersPage";
import SalesPage from "pages/Reports/SalesPage";
import { Route, Routes } from "react-router-dom";

export default function ProtectedRoutes(){
    return(
        <>
            <NavBar />
            <Routes>
                <Route index element = {<DashboardPage />}/>
                <Route path = "membership">
                    <Route index element = {<MembershipTypes />} />
                    <Route path = "create" element = {<CreateMembershipType />} />
                    <Route path = "edit/:id" element = {<EditMembershipType />} />
                </Route>
                <Route path = "addons">
                    <Route index element = {<AddonsPage />} />
                    <Route path = "add" element = {<AddAddon />} />
                    <Route path = "edit/:id" element = {<EditAddon />} />
                </Route>
                <Route path = "members">
                    <Route index element = {<Members />} />
                    <Route path = ":id" element = {<MemberByIdPage />} />
                    <Route path = "create" element = {<CreateMemberPage />} />
                    <Route path = "edit/:id" element = {<EditMemberPage />} />
                    <Route path = "renew/:id" element = {<RenewPage />} />
                </Route>

                <Route path = "reports">
                    <Route path = "sales" element = {<SalesPage />} /> 
                    <Route path = "members" element = {<MembersReportPage />} /> 
                    <Route path = "breakdown" element = {<BreakdownReportPage />} />
                </Route>
            </Routes>
        </>
        
    )
}