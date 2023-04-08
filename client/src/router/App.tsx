import { Route, Router, Routes, useNavigate } from "react-router-dom";
import Login from "../pages/Auth/Login";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useEffect, useState } from "react";
import { getCurrentAdmin } from "api/admin";
import { addAdmin } from "redux/adminReducer";
import ProtectedRoutes from "./ProtectedRoutes";
export default function App(){
    const admin = useSelector((state: RootState)=>state.admin?.data);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const getAdmin = async() => {
        const res = await getCurrentAdmin();
        setLoading(false);
        if(res.error) return;
        dispatch(addAdmin(res.data as any));
    }
    useEffect(()=>{
        getAdmin();
    }, [])
    useEffect(()=>{
        if(loading) return;
        if(!admin){
            navigate("/login");
        }
    }, [admin, loading])
    if(loading){
        return <div>Loading...</div>
    }
   
    return(
        <Routes>
            <Route path = "/login" element = {<Login />} />
            <Route path = "/*" element = {<ProtectedRoutes />} />
        </Routes>
    )
}