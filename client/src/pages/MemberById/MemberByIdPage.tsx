import { MemberT } from "@shared/Member";
import { cancelMembership, getMemberById } from "api/member";
import Main from "components/Container/Main";
import Header from "components/Header/Header";
import { toastError, toastSuccess } from "components/Toast/toast";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import { MemberResponseT } from "@shared/Api";
import { Box } from "components/Container/Box";
import moment from "moment";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { SimpleButton } from "components/Button/buttons";
export default function MemberByIdPage(){
    const id = useParams().id || "";
    const [member, setMember] = useState<MemberResponseT>();
    const [canCancel, setCanCancel] = useState<boolean>();
    const navigate = useNavigate();
    const fetchMember = async() => {
        const res = await getMemberById(id);
        if(res.error) return toastError(res.message);
        setMember(res.data);
        setCanCancel(res.data.membership_status.status === "Active");
    }
    const onCancel = async() => {
        if(!member) return;
        if(!window.confirm("Are you sure you want to cancel?")) return;
        const res = await cancelMembership(id);
        if(res.error) return  toastError(res.message);
        setCanCancel(false);
        setMember({...member, remaining_days: 0});
        toastSuccess(res.message)
    }
    useEffect(()=>{
        fetchMember();
    }, [id])
    if(!member) return (
        <>
            <Header title="Member" Icon={PersonIcon} />
        </>
    )
    return(
        <>
            <Header title="Member" Icon={PersonIcon} />
            <Main className="space-y-2">
                <Box className="flex flex-col space-y-4">
                    <div className="flex flex-col">
                        <div className="text-lg text-gray-700 font-medium">{member.full_name}</div>
                        <div className="text-gray-200">{member.age} years old {member.gender}</div>
                    </div>
                   <div className="flex">
                        <Info title="Contact No." subTitle={member.contact_no + ""} />
                        <Info title="Email" subTitle={member.email} />
                        <Info title="Address" subTitle={member.address} />
                        <Info title="DOB" subTitle={moment(member.DOB).format("DD/MM/yyyy") } />
                   </div>
                   <div className="flex">
                        <Info title="Membership" subTitle={member.membership.membership_name} />
                        <Info title="Addons" subTitle={member.addons.map(x=>x.addon_name).join(", ")} />
                        <Info title="Height" subTitle={member.height + " cm"} />
                        <Info title="Joined Date" subTitle={moment(member.joined_date).format("DD/MM/yyyy") } />
                   </div>
                </Box>
                <div className="flex space-x-2">
                    <Box className="flex flex-col space-y-2">
                        <div className="text-gray-700 font-medium text-lg">Remaining Days</div>
                        <div className="p-4">
                            <CircularProgressbarWithChildren styles={buildStyles({pathColor: "#FFC859"})} className="w-[150px] h-[150px]"  value={(member.remaining_days/(member.total_days || 1))*100}>
                                <div className="text-4xl text-gray-500 font-medium">{member.remaining_days}</div>
                                <div className="text-gray-500">Days</div>
                            </CircularProgressbarWithChildren>
                        </div>
                    </Box>
                    <Box className="flex flex-col flex-1">
                        <div className="text-gray-700 font-medium text-lg">Weight</div>
                    </Box>
                </div>
                <Box className="flex flex-col">
                    <div className="text-gray-700 font-medium text-lg mb-4">Actions</div>
                    <div className="flex flex-col space-y-4">
                        <Action 
                        title="Renew Membership" 
                        subTitle="If the membership of the member has been  expired you can renew the membership." 
                        button={<button onClick={()=>navigate("/members/renew/"+member.member_id)} className="bg-[#4EFF22] text-white-100 py-2 w-[80px] text-sm rounded-xl font-medium">RENEW</button>}
                        />
                        <Action 
                        title="Edit Membership" 
                        subTitle="Change member's information like name, age, email etc." 
                        button={<button onClick={()=>navigate("/members/edit/"+member.member_id)} className="bg-secondary-blue text-white-100 py-2 w-[80px] text-sm rounded-xl font-medium">EDIT</button>}
                        />
                       {canCancel && <Action 
                        title="Cancel Membership" 
                        subTitle="Cancel member's membership subscription." 
                        button={<button onClick={onCancel} className="bg-gray-100 text-white-100 py-2 w-[80px] text-sm rounded-xl font-medium">Cancel</button>}
                        />}
                        <Action 
                        title="Delete Member" 
                        subTitle="Delete member permanently." 
                        button={<button className="bg-primary-200 text-white-100 py-2 w-[80px] text-sm rounded-xl font-medium">DELETE</button>}
                        />
                    </div>  
                </Box>
            </Main>
        </>
    )
}

function Info({title, subTitle}: {title: string, subTitle: string}){
    return(
        <div className="flex flex-col flex-1 space-y-2 text-sm">
            <div className="text-gray-300">{title}</div>
            <div className="text-gray-500">{subTitle}</div>
        </div>
    )
}

function Action({title, subTitle, button}: {title: string, subTitle: string, button: any}){
    return(
        <div className="flex border-b-[1px] pb-4 border-brc-100 items-center">
            <div className="flex flex-col space-y-1">
                <div className="text-gray-700">{title}</div>
                <div className="text-gray-300 text-sm">{subTitle}</div>
            </div>
            <div className="ml-auto">{button}</div>
        </div>
    )
}