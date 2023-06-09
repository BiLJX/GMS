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
import { useEffect, useMemo } from "react";
import Table, { TDeleteButton, TEditButton, Td, Th, Thead, Tr } from "components/Table/TableComponents";
import { DataGrid, GridColDef, gridClasses } from "@mui/x-data-grid";
import { MembershipTypeT } from "@shared/MembershipTypes";

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
        if(!window.confirm("Are you sure you want to delete>")) return;
        const res = await deleteMembershipTypes(id);
        dispatch(removeMembershipType(id));
        if(res.error) return toastError(res.message);
        toastSuccess(res.message)
    }
    const columns = useMemo<GridColDef<MembershipTypeT>[]>(()=>[
        { field: 'member_id', headerName: 'ID', width: 50, align: "center", headerAlign: "center", sortable: false, disableColumnMenu: true ,renderCell: (params)=>params.api.getRowIndexRelativeToVisibleRows(params.row.membership_type_id)+1 },
        { field: "membership_name", headerName: "Membership Name", renderCell: (params)=><span className="text-secondary-blue font-semibold">{params.row.membership_name}</span>,flex: 1  },
        { field: "description", headerName: "Description", width: 300, sortable: false, disableColumnMenu: true },
        { field: "price", headerName: "Fee", renderCell: params => "Rs "+params.row.price, width: 120 },
        {field: 'actions', disableColumnMenu: true,headerName: "Actions", sortable: false, flex: 1,renderCell: ({row})=>(
            <div className="flex space-x-2">
                <TEditButton onClick={()=>navigate("edit/"+row.membership_type_id)} />
                <TDeleteButton onClick={()=>onDelete(row.membership_type_id)} />
            </div>
        )}
    ], [])
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
                    <DataGrid 
                    columns = {columns}
                    rows={membership_types}
                    getRowId={(row)=>row.membership_type_id}
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
                        // [`& .${gridClasses.columnHeader}`]: {
                        //     backgroundColor: "#00a3e4",
                        //     color: "#fff",
                        // },
                        // [`& .${gridClasses.row}:nth-child(odd)`]: {
                        //     backgroundColor: "#F5F8FF",
                        // },
                    }}
                    />
                </div>

            </Main>
        </>
    )
}