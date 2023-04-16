import Main from "components/Container/Main";
import Header from "components/Header/Header";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import TableSearchBar from "components/SearchBar/TableSearchBar";
import { SimpleButton } from "components/Button/buttons";
import { useNavigate } from "react-router-dom";
import { deleteMembershipTypes, getMembershipTypeList } from "api/membershipType";
import { toastError, toastSuccess } from "components/Toast/toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { addMembershipTypeList, removeMembershipType } from "redux/membershipTypeReducer";
import { useEffect } from "react";
import Table, { Td, Th, Thead, Tr } from "components/Table/TableComponents";

const theadData = ["Membership Name", "Period", "Description", "Fee", "ID", "Actions"];

export default function MembershipTypes(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const membership_types = useSelector((state: RootState)=>state.membership_types);
    const getMembershipTypes = async(search_string: string = "") => {
        const res = await getMembershipTypeList(search_string);
        if(res.error) return toastError(res.message);
        dispatch(addMembershipTypeList(res.data));
    }
    const onDelete = async(id: string) => {
        const res = await deleteMembershipTypes(id);
        dispatch(removeMembershipType(id));
        if(res.error) return toastError(res.message);
        toastSuccess(res.message)
    }
    useEffect(()=>{
        getMembershipTypes()
    }, [])
    return(
        <>
            <Header title="Membership Types" Icon={PersonOutlineIcon}  />
            <Main>
                <div className="p-4 bg-white-100 rounded-lg flex flex-col space-y-8 min-h-[80vh]">
                    <div className="text-gray-700 font-medium">Membership Types</div>
                    <div className="flex space-x-3">
                        <TableSearchBar onSearch={getMembershipTypes} style = {{flex: "1"}} />
                        <SimpleButton onClick={()=>navigate("create")} style={{fontSize: ".9rem", width: "125px", padding: "0", height: "33px"}}>Create</SimpleButton>
                    </div>
                    <Table>
                        <Thead>
                                <Th style={{width: "70px"}}></Th>
                                {theadData.map((x, i)=><Th key={i} style={{color: "#fff"}}>{x}</Th>)}
                        </Thead>
                        <tbody>
                            {
                                membership_types.map((x, i)=>(
                                    <Tr index={i+1}>
                                        <Td className="text-secondary-blue font-bold text-lg text-center">{i+1}</Td>
                                        <Td className="text-secondary-blue font-bold">{x.membership_name}</Td>
                                        <Td className="text-gray-500">{x.period} days</Td>
                                        <Td className="text-gray-500">{x.description}</Td>
                                        <Td className="text-gray-500">Rs {x.price}</Td>
                                        <Td className="text-gray-500">{x.membership_type_id}</Td>
                                        <Td className="flex space-x-2">
                                            <SimpleButton style={{
                                                backgroundColor: "#FFC859",
                                                
                                                height: "25px",
                                                fontSize: ".9rem",
                                                padding: "0 .8rem"
                                            }}>EDIT</SimpleButton>
                                            <SimpleButton onClick={()=>onDelete(x.membership_type_id)} style={{
                                                
                                                height: "25px",
                                                fontSize: ".9rem",
                                                padding: "0 1rem"
                                            }}>Delete</SimpleButton>
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