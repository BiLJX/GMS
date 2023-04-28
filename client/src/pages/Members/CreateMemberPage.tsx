import Header from "components/Header/Header";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Main from "components/Container/Main";
import { InputLabel, MenuItem, Select, TextField, TextFieldProps } from "@mui/material";
import { TwoButton } from "components/Button/buttons";
import { useNavigate } from "react-router-dom";
import { useEffect, useId, useState } from "react";
import { toastError } from "components/Toast/toast";
import { useDispatch } from "react-redux";
import { MembershipTypeT } from "@shared/MembershipTypes";
import { getMembershipTypeList } from "api/membershipType";
export default function CreateMemberPage(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [creating, setCreating] = useState(false);
    const [pfpSrc, setPfpSrc] = useState("");
    const [membershipTypes, setMembershipTypes] = useState<MembershipTypeT[]>([])
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
    useEffect(()=>{
        fetchMembershipTypes()
    }, [])
    return(
        <>
            <Header title="Membership Types" Icon={PersonOutlineIcon}  />
            <Main style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100vw"}}>
                <div className="p-4 bg-white-100 rounded-lg flex flex-col space-y-8 w-full">
                    <div className="text-gray-700 font-medium w-full">Create Member</div>  
                    <div className="flex flex-col space-y-8">
                        <div className="flex justify-center items-center w-full p-4">
                            <input onChange={onImage} id = {labelId} type = "file" accept="image/*" hidden />
                            <label htmlFor={labelId}  className="w-[150px] h-[150px] overflow-hidden rounded-[100%] bg-gray-100">
                                <img src = {pfpSrc} className="w-full h-full object-cover" />
                            </label>
                        </div>
                        <Row>
                            <Input label="Full Name" placeholder="Full Name..." />
                            <Input label="Address" placeholder="Nardevi, Kathmandu" />
                        </Row>
                        <Row>
                            <Input label="Email" placeholder="example@gmail.com" />
                            <Input label="DOB" placeholder="Date of birth" type = "date" />
                        </Row>
                        <Row>
                            <Input label="Contact No." placeholder="98...." />
                            <FormInputWrapper label="Membership Type">
                                <Select size = "small">
                                    {membershipTypes.map((x, i)=>(<MenuItem value = {x.membership_type_id} key={i}>{x.membership_name}</MenuItem>))}
                                </Select>
                            </FormInputWrapper>
                        </Row>
                        <Row>
                            <FormInputWrapper label="Gender">
                                <Select size="small">
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value = "Male">Male</MenuItem>
                                    <MenuItem value = "Other">Other</MenuItem>
                                </Select>
                            </FormInputWrapper>
                            <Input label="Addons" placeholder="Shower, Locker"/>
                        </Row>
                        <Row>
                            <Input label="Weight" placeholder="Weight (Kg)" type="number" />
                            <Input label="Discount" placeholder="Percentage" type = "number" />
                        </Row>
                        <Row>
                            <Input label="Height" placeholder="Height (cm)" type="number" />
                        </Row>
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