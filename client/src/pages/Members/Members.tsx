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
import { useEffect, useMemo, useState } from "react";
import Table, { TDeleteButton, TEditButton, Tbutton, Td, Th, Thead, Tr } from "components/Table/TableComponents";
import { RootState } from "redux/store";
import moment from "moment";
import { DataGrid, GridColDef, gridClasses} from '@mui/x-data-grid';
import { MemberT } from "@shared/Member";
import { grey } from "@mui/material/colors";
const theadData = ["Member Name", "Joined Date", "Renew Date", "Expire Date", "Status", "Actions"];

export default function Members(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const members = useSelector((state: RootState)=>state.members);
    const [pageSize, setPageSize] = useState(10)
    const fetchMembers = async(search: string = "") => {
        const res = await getMembers(search);
        if(res.error) return toastError(res.message);
        dispatch(addMemberList(res.data));
    }
    const columns = useMemo<GridColDef<MemberT>[]>(()=>([
        { field: 'member_id', headerName: 'ID', width: 50,  align: "center", headerAlign: "center", sortable: false, disableColumnMenu: true ,renderCell: (params)=>params.api.getRowIndexRelativeToVisibleRows(params.row.member_id)+1 },
        { field: 'full_name', headerName: "Name", renderCell: (params)=><NavLink className="text-secondary-blue font-semibold" to ={params.row.member_id}>{params.row.full_name}</NavLink>,flex: 1  },
        { field: 'renew_date', headerName: "Renew Date", renderCell: (params)=>moment(params.row.membership_status.renew_date).format("MMM Do, yyyy"), valueGetter: (params)=>params.row.membership_status.renew_date, flex: 1  },
        { field: 'expire_date', headerName: "Expire Date", renderCell: (params)=>moment(params.row.membership_status.expire_date).format("MMM Do, yyyy"), valueGetter: (params)=>params.row.membership_status.expire_date, flex: 1  },
        {field: 'status', headerName: 'Status', disableColumnMenu: true, renderCell: ({row})=>row.membership_status.status, sortable: false},
        {field: 'actions', disableColumnMenu: true,headerName: "Actions", sortable: false, flex: 1,renderCell: ({row})=>(
            <div className="flex space-x-2">
                <Tbutton onClick={()=>navigate("renew/"+row.member_id)} disabled = {row.membership_status.status === "Active"} label="Renew" style={{backgroundColor: "#00FF38"}} />
                <TEditButton onClick={()=>navigate("edit/"+row.member_id)} />
                <TDeleteButton />
            </div>
        )}
    ]), [])
    useEffect(()=>{
        fetchMembers();
    }, [])
    return(
        <>
            <Header title="Members" Icon={PeopleAltOutlinedIcon}  />
            <Main>
                <div className="p-4 bg-white-100 rounded-lg flex flex-col space-y-8 h-[86vh]">
                    <div className="text-gray-700 font-medium">Members</div>
                    <div className="flex space-x-3">
                        <TableSearchBar onSearch={fetchMembers} style = {{flex: "1"}} />
                        <SimpleButton onClick={()=>navigate("create")} style={{fontSize: ".9rem", width: "125px", padding: "0", height: "33px"}}>Create</SimpleButton>
                    </div>
                    <DataGrid 
                    columns = {columns}
                    rows={members}
                    getRowId={(row)=>row.member_id}
                    pageSizeOptions={[10, 15, 25]}
                    rowHeight={63}
                    
                    initialState={{
                        pagination: {
                            paginationModel: {pageSize: pageSize, page: 0},
                        },
                    }}
                    sx={{
                        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                           outline: "none !important",
                        },
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