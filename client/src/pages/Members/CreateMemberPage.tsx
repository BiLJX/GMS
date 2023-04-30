import Header from "components/Header/Header";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import Main from "components/Container/Main";
import { InputLabel, MenuItem, Select, TextField, TextFieldProps } from "@mui/material";
import { TwoButton } from "components/Button/buttons";
import { useNavigate } from "react-router-dom";
import { useEffect, useId, useState } from "react";
import { toastError } from "components/Toast/toast";
import { useDispatch, useSelector } from "react-redux";
import { MembershipTypeT } from "@shared/MembershipTypes";
import { getMembershipTypeList } from "api/membershipType";
import AddonSelector from "./AddonsSelector";
import { AddonT } from "@shared/Addon";
import { RootState } from "redux/store";
import { CreateMemberDataT } from "@shared/Api";
import { changeCreateMemberData, resetCreateMemberData } from "redux/createMemberReducer";
import Invoice from "./Invoice";
import { createMember } from "api/member";
import { addMember } from "redux/memberReducer";
export default function CreateMemberPage(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [creating, setCreating] = useState(false);
    const [pfpSrc, setPfpSrc] = useState("");
    const [membershipTypes, setMembershipTypes] = useState<MembershipTypeT[]>([]);
    const [isInoviceOpen, setIsInoviceOpen] = useState(false)
    const create_member_data = useSelector((state: RootState)=>state.create_member_data)
    const labelId = useId();
    const onImage = (e: any) => {
        const file = e.target.files[0];
        if(!file) return;
        const imageUrl = URL.createObjectURL(file);
        setPfpSrc(imageUrl)
    }
    const fetchMembershipTypes = async() => {
        const res = await getMembershipTypeList("");
        if(res.error) return toastError("Error fetching membership types");
        setMembershipTypes(res.data);
    }
    const changeData = (data: CreateMemberDataT) => {
        dispatch(changeCreateMemberData(data));
    }
    const onCreate = async() => {
        setCreating(true);
        const res = await createMember(create_member_data);
        setCreating(false);
        if(res.error) return toastError(res.message);
        dispatch(addMember(res.data));
        dispatch(resetCreateMemberData());
        navigate(-1)
    }
    useEffect(()=>{
        fetchMembershipTypes();
    }, [])
    return(
        <>
            {<Invoice isOpen = {isInoviceOpen} onClose={()=>setIsInoviceOpen(false)} />}
            <Header title="Members" Icon={PeopleAltOutlinedIcon}  />
            <Main style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100vw"}}>
                <div className="p-4 bg-white-100 rounded-lg flex flex-col space-y-8 w-full">
                    <div className="text-gray-700 font-medium w-full">Create Member</div>  
                    <div className="flex flex-col space-y-8">
                        {/* <div className="flex justify-center items-center w-full p-4">
                            <input onChange={onImage} id = {labelId} type = "file" accept="image/*" hidden />
                            <label htmlFor={labelId}  className="w-[150px] h-[150px] overflow-hidden rounded-[100%] bg-gray-100">
                                <img src = {pfpSrc} className="w-full h-full object-cover" />
                            </label>
                        </div> */}
                        <Row>
                            <Input 
                            onChange={e=>changeData({...create_member_data, full_name: e.target.value})} 
                            value={create_member_data.full_name}
                            label="Full Name" 
                            placeholder="Full Name..." 
                            />
                            <Input 
                            onChange={e=>changeData({...create_member_data, address: e.target.value})}
                            value={create_member_data.address} 
                            label="Address" 
                            placeholder="Nardevi, Kathmandu" />
                        </Row>
                        <Row>
                            <Input 
                            onChange={e=>changeData({...create_member_data, email: e.target.value})}
                            value={create_member_data.email} 
                            label="Email" 
                            placeholder="example@gmail.com" />
                            <Input 
                            onChange={e=>changeData({...create_member_data, DOB: e.target.value as any})}
                            value={create_member_data.DOB} 
                            label="DOB" 
                            placeholder="Date of birth" 
                            type = "date" 
                            />
                        </Row>
                        <Row>
                            <Input 
                            onChange={e=>changeData({...create_member_data, contact_no: parseInt(e.target.value)})}
                            value={create_member_data.contact_no} 
                            label="Contact No." 
                            placeholder="98...." 
                            />
                            <FormInputWrapper label="Membership Type">
                                <Select 
                                onChange={e=>changeData({...create_member_data, membership_type: membershipTypes.find(x=>x.membership_type_id === e.target.value)} as any)}
                                value={create_member_data.membership_type?.membership_type_id} 
                                size = "small"
                                >
                                    {membershipTypes.map((x, i)=>(<MenuItem value = {x.membership_type_id} key={i}>{x.membership_name}</MenuItem>))}
                                </Select>
                            </FormInputWrapper>
                        </Row>
                        <Row>
                            <FormInputWrapper label="Gender">
                                <Select 
                                onChange={e=>changeData({...create_member_data, gender: e.target.value as any})}
                                value={create_member_data.gender} 
                                size="small"
                                >
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value = "Male">Male</MenuItem>
                                    <MenuItem value = "Other">Other</MenuItem>
                                </Select>
                            </FormInputWrapper>
                            <FormInputWrapper label="Addons">
                                <AddonOpener />
                            </FormInputWrapper>
                        </Row>
                        <Row>
                            <Input 
                            onChange={e=>changeData({...create_member_data, weight: parseInt(e.target.value)})}
                            value={create_member_data.weight} 
                            label="Weight" 
                            placeholder="Weight (Kg)" 
                            type="number" 
                            />
                            <Input 
                            onChange={e=>changeData({...create_member_data, discount: parseInt(e.target.value)})}
                            value={create_member_data.discount} 
                            label="Discount" 
                            placeholder="Percentage" 
                            type = "number" 
                            />
                        </Row>
                        <Row>
                            <Input 
                            onChange={e=>changeData({...create_member_data, height: parseInt(e.target.value)})}
                            value={create_member_data.height} 
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

interface AddonOpenerProps {
    addons: AddonT,
}
function AddonOpener(){
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const addons = useSelector((state: RootState)=>state.create_member_data.addons)
    const hasAddons = addons.length;
    return(
        <>
            {<AddonSelector  isOpen = {isSelectorOpen} onClose={()=>setIsSelectorOpen(false)} />}
            <div onClick={()=>setIsSelectorOpen(true)} className={`p-2 cursor-pointer ${hasAddons?"text-gray-700":"text-gray-100"} rounded-md border-gray-100 border-[1px]`}>{hasAddons?addons.map(x=>x.addon_name).join(", "):"Add Addons"}</div>
        </>
    )
}