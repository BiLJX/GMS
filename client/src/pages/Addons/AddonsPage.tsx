import Main from "components/Container/Main";
import Header from "components/Header/Header";
import TableSearchBar from "components/SearchBar/TableSearchBar";
import { SimpleButton } from "components/Button/buttons";
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { useNavigate } from "react-router-dom";
import Table, { TDeleteButton, TEditButton, Td, Th, Thead, Tr } from "components/Table/TableComponents";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useEffect, useMemo } from "react"
import { deleteAddon, getAddonList } from "api/addon";
import { toastError } from "components/Toast/toast";
import { addAddonList, removeAddon } from "redux/addonReducer";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AddonT } from "@shared/Addon";
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
    const onDelete = async(id: string) => {
        if(!window.confirm("Are you sure you want to delete>")) return;
        const res = await deleteAddon(id);
        if(res.error) return toastError(res.message);
        dispatch(removeAddon(id));
    }
    const columns = useMemo<GridColDef<AddonT>[]>(()=>[
        { field: 'addon_id', headerName: 'ID', width: 50, align: "center", headerAlign: "center", sortable: false, disableColumnMenu: true ,renderCell: (params)=><span>{params.api.getRowIndexRelativeToVisibleRows(params.row.addon_id)+1}</span> },
        { field: "addon_name", headerName: "Addon Name", renderCell: (params)=><span className="text-secondary-blue font-semibold">{params.row.addon_name}</span>,flex: 1  },
        { field: "price", headerName: "Price", renderCell: params => "Rs "+params.row.price, flex: 1 },
        {field: 'actions', disableColumnMenu: true,headerName: "Actions", sortable: false, flex: 1,renderCell: ({row})=>(
            <div className="flex space-x-2">
                <TEditButton onClick={()=>navigate("edit/"+row.addon_id)} />
                <TDeleteButton onClick={()=>onDelete(row.addon_id)} />
            </div>
        )}
    ], [])
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
                        <TableSearchBar style = {{flex: "1"}} onSearch={getAddons} />
                        <SimpleButton onClick={()=>navigate("add")} style={{fontSize: ".9rem", width: "125px", padding: "0", height: "33px"}}>Add</SimpleButton>
                    </div>
                    <DataGrid 
                    columns = {columns}
                    rows={addons}
                    getRowId={(row)=>row.addon_id}
                    pageSizeOptions={[10, 15, 25]}
                    rowHeight={63}
                    initialState={{
                        pagination: {
                            paginationModel: {pageSize: 10, page: 0},
                        },
                    }}
                    sx={{
                        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                           outline: "none !important",
                        },
                    }}
                    />
                    {/* <Table>
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
                                        <TEditButton onClick={()=>navigate("edit/"+x.addon_id)}/>
                                        <TDeleteButton onClick={()=>onDelete(x.addon_id)}/>
                                    </Td>
                                </Tr>   
                            ))}
                            
                        </tbody>
                    </Table> */}
                </div>
            </Main>
        </>
    )
}