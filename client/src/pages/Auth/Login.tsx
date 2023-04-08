import { Input, TextField } from "@mui/material"
import { SimpleButton } from "../../components/Button/buttons"
import { useState } from "react"
import { adminLogin } from "api/auth";
import { toastError } from "components/Toast/toast";
import { useDispatch } from "react-redux";
import { addAdmin } from "redux/adminReducer";
import { useNavigate } from "react-router-dom";
export default function Login(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false);
    const onLogin = async() => {
        setLoading(true);
        const res = await adminLogin(data);
        setLoading(false);
        if(res.error){
            return toastError(res.message);
        }
        dispatch(addAdmin(res.data));
        navigate("/")
    }
    return(
        <div className="h-[100vh] w-[100vw] flex items-center justify-center">
            <form className="bg-white-100 p-8 flex flex-col w-[400px] rounded-xl" onSubmit={(e)=>{e.preventDefault(); onLogin()}}>
                <div className="mb-6">
                    <h1 className="text-center text-3xl font-bold text-gray-700">Gym Login</h1>
                </div>
                <div className="flex-col flex space-y-6">
                    <TextField placeholder="Email" size="small" onChange={(e)=>setData({...data, email: e.target.value})} />
                    <TextField placeholder="Password" size="small" type="password" onChange={(e)=>setData({...data, password: e.target.value})}  />
                    <SimpleButton loading = {loading} loadingLabel="Logging in...">Login</SimpleButton>
                </div>
            </form>
        </div>
    )
}