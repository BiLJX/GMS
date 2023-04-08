import NavBar from "components/NavBar/NavBar";
import Members from "pages/Members/Members";
import { Route, Routes } from "react-router-dom";

export default function ProtectedRoutes(){
    return(
        <>
            <NavBar />
            <Routes>
                <Route index element = {<></>}/>
                <Route path = "members">
                    <Route index element = {<Members />} />
                </Route>
            </Routes>
        </>
        
    )
}