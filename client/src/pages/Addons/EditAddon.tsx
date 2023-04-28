import Header from "components/Header/Header";
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import Main from "components/Container/Main";
import { InputLabel, TextField } from "@mui/material";
import { TwoButton } from "components/Button/buttons";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { updateAddon } from "redux/addonReducer";
import { AddAddonsDataT } from "@shared/Api";
import { editAddon, getAddonById } from "api/addon";
import { toastError } from "components/Toast/toast";
import { useDispatch, useSelector } from "react-redux";
import { useLayoutEffect  } from "react"
import { RootState } from "redux/store";
export default function EditAddon(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id = useParams().id || "";
    const preData = useSelector((state: RootState)=>state.addons).find(x=>x.addon_id === id);
    const [data, setData] = useState<AddAddonsDataT & {addon_id: string}>({
        addon_name: preData?.addon_name || "",
        price: preData?.price || null,
        addon_id: id
    })
    const [loading, setLoading] = useState(false);
    const onEdit = async() => {
        setLoading(true);
        const res = await editAddon(data);
        setLoading(false);
        if(res.error) return toastError(res.message);
        dispatch(updateAddon({...res.data, ...(data as any)}));
        navigate(-1);
    }
    const getAddon = async() => {
        const res = await getAddonById(id);
        if(res.error) return toastError(res.message);
        setData(res.data);
    }
    useLayoutEffect (()=>{
        getAddon()
    }, [id])
    return(
        <>
            <Header title="Addons" Icon={NoteAddOutlinedIcon}  />
            <Main className="flex items-center justify-center h-[100vh]">
                <div className="p-8 bg-white-100 rounded-lg w-[500px] flex flex-col space-y-8">
                    <div className="text-gray-700 font-medium text-center text-xl">Edit Addons</div>
                    <div className="flex flex-col space-y-4">
                        <div className="flex flex-col space-y-2">
                            <InputLabel>Addon Name</InputLabel>
                            <TextField value={data.addon_name} onChange={e=>setData({...data, addon_name: e.target.value})} autoComplete="off" variant="outlined" placeholder="Shower..." size="small" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <InputLabel>Price</InputLabel>
                            <TextField value={data.price} onChange={e=>setData({...data, price: parseInt(e.target.value||"0")})} type="number" autoComplete="off" variant="outlined" placeholder="Rs Price" size="small" />
                        </div>
                    </div>
                    
                    <TwoButton onClick={onEdit} onCancel={()=>navigate(-1)} cancelLabel="Cancel" loading = {loading} loadingLabel="Editing...">Edit</TwoButton>
                </div>
            </Main>
        </>
    )
}