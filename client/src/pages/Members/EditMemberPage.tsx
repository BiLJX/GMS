import Header from "components/Header/Header";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import Main from "components/Container/Main";
import { InputLabel, MenuItem, Select, TextField, TextFieldProps } from "@mui/material";
import { TwoButton } from "components/Button/buttons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useId, useState } from "react";
import { toastError } from "components/Toast/toast";
import { useDispatch, useSelector } from "react-redux";
import { MembershipTypeT } from "@shared/MembershipTypes";
import { getMembershipTypeList } from "api/membershipType";
import AddonSelector from "./AddonsSelector";
import { AddonT } from "@shared/Addon";
import { RootState } from "redux/store";
import { CreateMemberDataT, EditMemberDataT } from "@shared/Api";
import { changeCreateMemberData, resetCreateMemberData } from "redux/createMemberReducer";
import Invoice from "./Invoice";
import { createMember, editMember, getMemberById } from "api/member";
import { addMember } from "redux/memberReducer";
export default function CreateMemberPage(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id = useParams().id || "";
    const [creating, setCreating] = useState(false);
    const [pfpSrc, setPfpSrc] = useState("");
    const [isInoviceOpen, setIsInoviceOpen] = useState(false)
    const [editData, setEditData] = useState<EditMemberDataT>();
    const labelId = useId();
    
    useEffect(()=>{
        getMemberById(id).then(res=>{
            if(res.error) return toastError(res.message);
            setEditData(res.data);
        })
    }, []);

    if(!editData) return (
        <>
            <Header title="Members" Icon={PeopleAltOutlinedIcon}  />
        </>
    )
    const onImage = (e: any) => {
        const file = e.target.files[0];
        if(!file) return;
        const imageUrl = URL.createObjectURL(file);
        setPfpSrc(imageUrl)
    }
    const onCreate = async() => {
        setCreating(true);
        const res = await editMember(id, editData);
        setCreating(false);
        if(res.error) return toastError(res.message);
        dispatch(addMember(res.data));
        dispatch(resetCreateMemberData());
        navigate(-1)
    }
    
    return(
        <>
            {<Invoice isOpen = {isInoviceOpen} onClose={()=>setIsInoviceOpen(false)} />}
            <Header title="Members" Icon={PeopleAltOutlinedIcon}  />
            <Main style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100vw"}}>
                <div className="p-4 bg-white-100 rounded-lg flex flex-col space-y-8 w-full">
                    <div className="text-gray-700 font-medium w-full">Create Member</div>  
                    <div className="flex flex-col space-y-8">
                        <Row>
                            <Input 
                            onChange={e=>setEditData({...editData, full_name: e.target.value})} 
                            value={editData.full_name}
                            label="Full Name" 
                            placeholder="Full Name..." 
                            />
                            <Input 
                            onChange={e=>setEditData({...editData, address: e.target.value})}
                            value={editData.address} 
                            label="Address" 
                            placeholder="Nardevi, Kathmandu" />
                        </Row>
                        <Row>
                            <Input 
                            onChange={e=>setEditData({...editData, email: e.target.value})}
                            value={editData.email} 
                            label="Email" 
                            placeholder="example@gmail.com" />
                            <Input 
                            onChange={e=>setEditData({...editData, DOB: e.target.value as any})}
                            value={editData.DOB} 
                            label="DOB" 
                            placeholder="Date of birth" 
                            type = "date" 
                            />
                        </Row>
                        <Row>
                            <Input 
                            onChange={e=>setEditData({...editData, contact_no: parseInt(e.target.value)})}
                            value={editData.contact_no} 
                            label="Contact No." 
                            placeholder="98...." 
                            />
                        </Row>
                        <Row>
                            <FormInputWrapper label="Gender">
                                <Select 
                                onChange={e=>setEditData({...editData, gender: e.target.value as any})}
                                value={editData.gender} 
                                size="small"
                                >
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value = "Male">Male</MenuItem>
                                    <MenuItem value = "Other">Other</MenuItem>
                                </Select>
                            </FormInputWrapper>
                        
                        </Row>
                        <Row>
                            <Input 
                            onChange={e=>setEditData({...editData, height: parseInt(e.target.value)})}
                            value={editData.height} 
                            label="Height" 
                            placeholder="Height (cm)" 
                            type="number" 
                            />
                        </Row>
                        <div>
                            <button className="text-secondary-blue font-medium" onClick={()=>setIsInoviceOpen(true)}>Click here to VIEW BILL</button>
                        </div>
                        <div className="w-[40%]">
                            <TwoButton 
                            cancelLabel="Cancel" 
                            loadingLabel="Creating..." 
                            onClick={onCreate}
                            loading = {creating}
                            onCancel={()=>navigate(-1)}
                            >Create</TwoButton>
                        </div>
                    </div>
                </div>
            </Main>
        </>
    )
}

function Row({children}: {children: any}){
    return(
        <div className = "flex justify-between w-full">
            {children}
        </div>
    )
}

function Input(props: TextFieldProps & {label: string}){
    const _props = {...props};
    delete (_props as any).label;
    return(
        <div className="flex flex-col space-y-2 w-[40%]">
            <InputLabel>{props.label}</InputLabel>
            <TextField autoComplete="off" variant="outlined" {..._props} size="small" />
        </div>
    )
}

function FormInputWrapper({label, children}: {label: string, children: any}){
    return(
        <div className="flex flex-col space-y-2 w-[40%]">
            <InputLabel>{label}</InputLabel>
            {children}
        </div>
    )
}

