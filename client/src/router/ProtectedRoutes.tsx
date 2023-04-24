import NavBar from "components/NavBar/NavBar";
import AddAddon from "pages/Addons/AddAddon";
import AddonsPage from "pages/Addons/AddonsPage";
import Members from "pages/Members/Members";
import CreateMembershipType from "pages/MembershipTypes/CreateMembershipType";
import EditMembershipType from "pages/MembershipTypes/EditMembershipType";
import MembershipTypes from "pages/MembershipTypes/MembershipTypes";
import { Route, Routes } from "react-router-dom";

export default function ProtectedRoutes(){
    return(
        <>
            <NavBar />
            <Routes>
                <Route index element = {<></>}/>
                <Route path = "membership">
                    <Route index element = {<MembershipTypes />} />
                    <Route path = "create" element = {<CreateMembershipType />} />
                    <Route path = "edit/:id" element = {<EditMembershipType />} />
                </Route>
                <Route path = "addons">
                    <Route index element = {<AddonsPage />} />
                    <Route path = "add" element = {<AddAddon />} />
                    <Route path = "edit/:id" element = {<></>} />
                </Route>
                <Route path = "members">
                    <Route index element = {<Members />} />
                </Route>
            </Routes>
        </>
        
    )
}