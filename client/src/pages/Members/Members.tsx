import Main from "components/Container/Main";
import Header from "components/Header/Header";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import TableSearchBar from "components/SearchBar/TableSearchBar";
import { SimpleButton } from "components/Button/buttons";
import { NavLink, useNavigate } from "react-router-dom";
import { getMembers } from "api/member";
import { toastError } from "components/Toast/toast";
import { useDispatch, useSelector } from "react-redux";
import { addMemberList } from "redux/memberReducer";
import { useEffect } from "react";
import Table, { TDeleteButton, TEditButton, Tbutton, Td, Th, Thead, Tr } from "components/Table/TableComponents";
import { RootState } from "redux/store";
import moment from "moment";

const theadData = ["Member Name", "Joined Date", "Renew Date", "Expire Date", "Status", "Actions"];

export default function Members(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const members = useSelector((state: RootState)=>state.members)
    const fetchMembers = async(search: string = "") => {
        const res = await getMembers(search);
        if(res.error) return toastError(res.message);
        dispatch(addMemberList(res.data));
    }
    useEffect(()=>{
        fetchMembers();
    }, [])
    return(
        <>
            <Header title="Members" Icon={PeopleAltOutlinedIcon}  />
            <Main>
                <div className="p-4 bg-white-100 rounded-lg flex flex-col space-y-8">
                    <div className="text-gray-700 font-medium">Members</div>
                    <div className="flex space-x-3">
                        <TableSearchBar onSearch={fetchMembers} style = {{flex: "1"}} />
                        <SimpleButton onClick={()=>navigate("create")} style={{fontSize: ".9rem", width: "125px", padding: "0", height: "33px"}}>Create</SimpleButton>
                    </div>
                    <Table>
                        <Thead>
                            <Th style={{width: "70px"}}></Th>
                            {theadData.map((x, i)=><Th key={i} style={{color: "#fff"}}>{x}</Th>)}
                        </Thead>
                        <tbody>
                        {
                                members.map((x, i)=>(
                                    <Tr index={i+1}>
                                        <Td className="text-secondary-blue font-bold text-lg text-center">{i+1}</Td>
                                        <Td className="text-secondary-blue font-bold"><NavLink to = {x.member_id}> {x.full_name} </NavLink></Td>
                                        <Td className="text-gray-500">{moment(x.joined_date).format("MMM Do, yyyy")}</Td>
                                        <Td className="text-gray-500">{moment(x.membership_status.renew_date).format("MMM Do, yyyy")}</Td>
                                        <Td className="text-gray-500">{moment(x.membership_status.expire_date).format("MMM Do, yyyy")}</Td>
                                        <Td className="text-gray-500">{x.membership_status.status}</Td>
                                        <Td className="flex space-x-2">
                                            <Tbutton onClick={()=>navigate("renew/"+x.member_id)} disabled = {x.membership_status.status === "Active"} label="Renew" style={{backgroundColor: "#00FF38"}} />
                                            <TEditButton onClick={()=>navigate("edit/"+x.member_id)} />
                                            <TDeleteButton />
                                        </Td>
                                    </Tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>

            </Main>
        </>
    )
}