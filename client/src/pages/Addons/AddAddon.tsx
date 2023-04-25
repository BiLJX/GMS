import Header from "components/Header/Header";
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import Main from "components/Container/Main";
import { InputLabel, TextField } from "@mui/material";
import { TwoButton } from "components/Button/buttons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addAddon } from "redux/addonReducer";
import { AddAddonsDataT } from "@shared/Api";
import { createAddon } from "api/addon";
import { toastError } from "components/Toast/toast";
import { useDispatch } from "react-redux";
export default function AddAddon(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState<AddAddonsDataT>({
        addon_name: "",
        price: null
    })
    const [loading, setLoading] = useState(false);
    const onAdd = async() => {
        setLoading(true);
        const res = await createAddon(data);
        setLoading(false);
        if(res.error) return toastError(res.message);
        dispatch(addAddon(res.data));
        navigate(-1);
    }
    return(
        <>
            <Header title="Addons" Icon={NoteAddOutlinedIcon}  />
            <Main className="flex items-center justify-center h-[100vh]">
                <div className="p-8 bg-white-100 rounded-lg w-[500px] flex flex-col space-y-8">
                    <div className="text-gray-700 font-medium text-center text-xl">Add Addons</div>
                    <div className="flex flex-col space-y-4">
                        <div className="flex flex-col space-y-2">
                            <InputLabel>Addon Name</InputLabel>
                            <TextField onChange={e=>setData({...data, addon_name: e.target.value})} autoComplete="off" variant="outlined" placeholder="Shower..." size="small" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <InputLabel>Price</InputLabel>
                            <TextField onChange={e=>setData({...data, price: parseInt(e.target.value||"0")})} type="number" autoComplete="off" variant="outlined" placeholder="Rs Price" size="small" />
                        </div>
                    </div>
                    
                    <TwoButton onClick={onAdd} onCancel={()=>navigate(-1)} cancelLabel="Cancel" loading = {loading} loadingLabel="Adding...">Add</TwoButton>
                </div>
            </Main>
        </>
    )
}