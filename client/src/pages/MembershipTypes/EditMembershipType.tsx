import Header from "components/Header/Header";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Main from "components/Container/Main";
import { useEffect } from "react";
import { InputLabel, TextField } from "@mui/material";
import { TwoButton } from "components/Button/buttons";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { CreateMembershipTypeDataT } from "@shared/Api"
import { createMembershipType, editMembershipType, getMembershipTypeById } from "api/membershipType";
import { toastError } from "components/Toast/toast";
import { useDispatch } from "react-redux";
import { addMembershipType } from "redux/membershipTypeReducer";
export default function EditMembershipType(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const membership_type_id = useParams().id as string;
    const [editing, setEditing] = useState(false);
    const [data, setData] = useState<CreateMembershipTypeDataT & {membership_type_id: string}>({
        membership_type_id: "",
        membership_name: "",
        period: null,
        description: "",
        price: null,
        registration_fee: null
    })
    const getData = async() => {
        const res = await getMembershipTypeById(membership_type_id);
        if(res.error) return toastError(res.message);
        setData(res.data);
    }
    const edit = async() => {
        setEditing(true);
        const res = await editMembershipType(data);
        setEditing(false);
        if(res.error) return toastError(res.message);
        navigate(-1);
    }
    useEffect(()=>{
        getData();
    }, [membership_type_id])
    //EDITTTT
    return(
        <>
            <Header title="Membership Types" Icon={PersonOutlineIcon}  />
            <Main style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100vw"}}>
                <div className="p-4 bg-white-100 rounded-lg flex flex-col space-y-8 w-[450px]">
                    <div className="text-gray-700 font-medium w-full text-center">Edit Membership Type</div>  
                    <div className="flex flex-col space-y-8">
                        <div className="flex flex-col space-y-2">
                            <InputLabel>Membership Name</InputLabel>
                            <TextField value={data.membership_name} onChange={(e)=>setData({...data, membership_name: e.target.value})} autoComplete="off" variant="outlined" placeholder="Full Name" size="small" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <InputLabel>Period</InputLabel>
                            <TextField value={data.period} onChange={(e)=>setData({...data, period: parseInt(e.target.value)})} autoComplete="off" type="number" variant="outlined" placeholder="Period (Days)" size="small" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <InputLabel>Price</InputLabel>
                            <TextField value={data.price} onChange={(e)=>setData({...data, price: parseInt(e.target.value)})} autoComplete="off" type="number" variant="outlined" placeholder="Rs Fee" size="small" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <InputLabel>Registration Fee</InputLabel>
                            <TextField value={data.registration_fee} onChange={(e)=>setData({...data, registration_fee: parseInt(e.target.value)})} autoComplete="off" type="number" variant="outlined" placeholder="Rs Reg.Fee" size="small" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <InputLabel>Description</InputLabel>
                            <TextField value={data.description} onChange={(e)=>setData({...data, description: e.target.value})} autoComplete="off" multiline rows={5} variant="outlined" placeholder="Describe membership" size="small" />
                        </div>
                        <div>
                            <TwoButton onClick={edit} loadingLabel="Editing..." loading = {editing} onCancel={()=>navigate(-1)} cancelLabel="Cancel">Edit</TwoButton>
                        </div>
                    </div>
                </div>
            </Main>
        </>
    )
}