import NavBar from "components/NavBar/NavBar";
import Members from "pages/Members/Members";
import CreateMembershipType from "pages/MembershipTypes/CreateMembershipType";
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
                </Route>
                <Route path = "members">
                    <Route index element = {<Members />} />
                </Route>
            </Routes>
        </>
        
    )
}