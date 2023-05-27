import Header from "components/Header/Header";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import Main from "components/Container/Main";
import { TextField, Select, MenuItem, InputLabel, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { InputWithLabel } from "components/Input/Inputs";
import { useState, useEffect, useLayoutEffect } from "react"
import { MembershipTypeT } from "@shared/MembershipTypes";
import { getMembershipTypeList } from "api/membershipType";
import { toastError } from "components/Toast/toast";
import { useNavigate, useParams } from "react-router-dom";
import { getMemberById, renewMemberShip } from "api/member";
import { MemberT } from "@shared/Member";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { changeCreateMemberData, resetCreateMemberData } from "redux/createMemberReducer";
import { AddonOpener } from "./CreateMemberPage";
import Invoice from "./Invoice";
import { TwoButton } from "components/Button/buttons";
import { CreateMemberDataT } from "@shared/Api";
export default function RenewPage(){

    const dispatch  = useDispatch(); 
    const navigate = useNavigate();
    const id = useParams().id || "";

    const [membershipTypes, setMembershipTypes] = useState<MembershipTypeT[]>([]);
    const [member, setMember] = useState<MemberT>();
    const [isInoviceOpen, setIsInoviceOpen] = useState(false);
    const [renewing, setRenewing] = useState(false);
    const create_member_data = useSelector((state: RootState)=>state.create_member_data) as CreateMemberDataT & {renew_from: "today"|"expire"};
    
    const fetchMembershipTypes = async() => {
        const res = await getMembershipTypeList();
        if(res.error) return toastError("There was an error fetching membership types");
        setMembershipTypes(res.data);
    }
    const fetchMemberData = async() => {
        const res = await getMemberById(id);
        if(res.error) return toastError(res.message);
        setMember(res.data);
    }

    const onRenew = async() => {
        setRenewing(true);
        const res = await renewMemberShip(id, create_member_data);
        setRenewing(false);
        if(res.error) return toastError(res.message);
        navigate(-1);
    }

    useLayoutEffect(()=>{
        fetchMembershipTypes();
        fetchMemberData();
    }, [id]);
    useEffect(()=>{
        return(()=>{
            dispatch(resetCreateMemberData());
        })
    }, [id])
    if(!member) return <></>
    return(
        <>
            {<Invoice isOpen = {isInoviceOpen} onClose={()=>setIsInoviceOpen(false)} />}
            <Header title="Members" Icon={PeopleAltOutlinedIcon}  />
            <Main className="flex justify-center items-center">
                <div className="p-4 bg-white-100 rounded-lg flex flex-col space-y-8 w-[400px]">
                    <div className="text-gray-700 font-medium w-full">Renew Membership</div> 
                    <FormInputWrapper label="Membership Type">
                        <Select 
                        size = "small"
                        onChange={e=>dispatch(changeCreateMemberData({...create_member_data, membership_type: membershipTypes.find(x=>x.membership_type_id === e.target.value) as any}))}
                        >
                            {membershipTypes.map((x, i)=>(<MenuItem value = {x.membership_type_id} key={i}>{x.membership_name}</MenuItem>))}
                        </Select>
                    </FormInputWrapper>
                    <FormInputWrapper label="Addons">
                        <AddonOpener />
                    </FormInputWrapper>
                    <FormInputWrapper label = "Discount">
                        <TextField value = {create_member_data.discount} onChange = {e=>dispatch(changeCreateMemberData({...create_member_data, discount: parseInt(e.target.value)}))} size = "small" placeholder="Discount Percentage" type = "number" />
                    </FormInputWrapper>
                    <FormInputWrapper label="Renew From">
                        <ToggleButtonGroup exclusive value={create_member_data.renew_from || "today"} onChange={(e, val)=>dispatch(changeCreateMemberData({...create_member_data, renew_from: val} as any))}>
                            <ToggleButton value = "today">Today</ToggleButton>
                            <ToggleButton value = "expire">Expire Date</ToggleButton>
                        </ToggleButtonGroup>
                    </FormInputWrapper>
                    <div>
                        <button className="text-secondary-blue font-medium" onClick={()=>setIsInoviceOpen(true)}>Click here to VIEW BILL</button>
                    </div>
                    <div className="">
                        <TwoButton 
                        cancelLabel="Cancel" 
                        loadingLabel="Creating..." 
                        onClick={onRenew}
                        loading = {renewing}
                        onCancel={()=>navigate(-1)}
                        >Renew</TwoButton>
                    </div>
                </div>
            </Main>
        </>
    )
}

function FormInputWrapper({label, children}: {label: string, children: any}){
    return(
        <div className="flex flex-col space-y-2">
            <InputLabel>{label}</InputLabel>
            {children}
        </div>
    )
}