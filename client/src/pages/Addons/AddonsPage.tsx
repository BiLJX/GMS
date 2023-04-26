import Main from "components/Container/Main";
import Header from "components/Header/Header";
import TableSearchBar from "components/SearchBar/TableSearchBar";
import { SimpleButton } from "components/Button/buttons";
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { useNavigate } from "react-router-dom";
import Table, { TDeleteButton, TEditButton, Td, Th, Thead, Tr } from "components/Table/TableComponents";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useEffect } from "react"
import { getAddonList } from "api/addon";
import { toastError } from "components/Toast/toast";
import { addAddonList } from "redux/addonReducer";
const theadData = ["Addon Name", "Price", "ID", "Actions"];
export default function AddonsPage(){
    const navigate = useNavigate();
    const addons = useSelector((state: RootState)=>state.addons);
    const dispatch = useDispatch();
    const getAddons = async(name: string = "") => {
        const res = await getAddonList(name);
        if(res.error) return toastError(res.message);
        dispatch(addAddonList(res.data));
    }
    useEffect(()=>{
        getAddons()
    }, [])
    return(
        <>
            <Header title="Addons" Icon={NoteAddOutlinedIcon}  />
            <Main>
                <div className="p-4 bg-white-100 rounded-lg flex flex-col space-y-8 min-h-[80vh]">
                    <div className="text-gray-700 font-medium">Addons</div>
                    <div className="flex space-x-3">
                        <TableSearchBar style = {{flex: "1"}} />
                        <SimpleButton onClick={()=>navigate("add")} style={{fontSize: ".9rem", width: "125px", padding: "0", height: "33px"}}>Add</SimpleButton>
                    </div>
                    <Table>
                        <Thead>
                            <Th style={{width: "70px"}}></Th>
                            {theadData.map((x, i)=><Th key={i} style={{color: "#fff"}}>{x}</Th>)}
                        </Thead>
                        <tbody>
                            {addons.map((x, i)=>(
                                <Tr index={i} key={i}>
                                    <Td className="text-secondary-blue font-bold text-lg text-center">{i+1}</Td>
                                    <Td className="text-secondary-blue font-bold">{x.addon_name}</Td>
                                    <Td className="text-gray-500">Rs {x.price}</Td>
                                    <Td className="text-gray-500">{x.addon_id}</Td>
                                    <Td className="flex space-x-2">
                                        <TEditButton/>
                                        <TDeleteButton/>
                                    </Td>
                                </Tr>   
                            ))}
                            
                        </tbody>
                    </Table>
                </div>
            </Main>
        </>
    )
}