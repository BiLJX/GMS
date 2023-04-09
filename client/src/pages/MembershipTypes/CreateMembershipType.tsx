import Header from "components/Header/Header";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Main from "components/Container/Main";
import { InputLabel, TextField } from "@mui/material";
import { TwoButton } from "components/Button/buttons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CreateMembershipTypeDataT } from "@shared/Api"
import { createMembershipType } from "api/membershipType";
import { toastError } from "components/Toast/toast";
export default function CreateMembershipType(){
    const navigate = useNavigate();
    const [creating, setCreating] = useState(false);
    const [data, setData] = useState<CreateMembershipTypeDataT>({
        membership_name: "",
        period: null,
        description: "",
        price: null
    })

    const create = async() => {
        setCreating(true);
        const res = await createMembershipType(data);
        setCreating(false);
        if(res.error) return toastError(res.message);
        console.log(res.data);
    }


    return(
        <>
            <Header title="Membership Types" Icon={PersonOutlineIcon}  />
            <Main style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100vw"}}>
                <div className="p-4 bg-white-100 rounded-lg flex flex-col space-y-8 w-[450px]">
                    <div className="text-gray-700 font-medium w-full text-center">Add Membership Types</div>  
                    <div className="flex flex-col space-y-8">
                        <div className="flex flex-col space-y-2">
                            <InputLabel>Membership Name</InputLabel>
                            <TextField onChange={(e)=>setData({...data, membership_name: e.target.value})} autoComplete="off" variant="outlined" placeholder="Full Name" size="small" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <InputLabel>Period</InputLabel>
                            <TextField onChange={(e)=>setData({...data, period: parseInt(e.target.value)})} autoComplete="off" type="number" variant="outlined" placeholder="Period (Days)" size="small" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <InputLabel>Price</InputLabel>
                            <TextField onChange={(e)=>setData({...data, price: parseInt(e.target.value)})} autoComplete="off" type="number" variant="outlined" placeholder="Rs Fee" size="small" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <InputLabel>Description</InputLabel>
                            <TextField onChange={(e)=>setData({...data, description: e.target.value})} autoComplete="off" multiline rows={5} variant="outlined" placeholder="Describe membership" size="small" />
                        </div>
                        <div>
                            <TwoButton onClick={create} loadingLabel="Adding..." loading = {creating} onCancel={()=>navigate(-1)} cancelLabel="Cancel">Add</TwoButton>
                        </div>
                    </div>
                </div>
            </Main>
        </>
    )
}