import Main from "components/Container/Main";
import Header from "components/Header/Header";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import TableSearchBar from "components/SearchBar/TableSearchBar";
import { SimpleButton } from "components/Button/buttons";
import { useNavigate } from "react-router-dom";
export default function MembershipTypes(){
    const navigate = useNavigate()
    return(
        <>
            <Header title="Membership Types" Icon={PersonOutlineIcon}  />
            <Main>
                <div className="p-4 bg-white-100 rounded-lg flex flex-col space-y-8">
                    <div className="text-gray-700 font-medium">Membersship Types</div>
                    <div className="flex space-x-3">
                        <TableSearchBar style = {{flex: "1"}} />
                        <SimpleButton onClick={()=>navigate("create")} style={{fontSize: ".9rem", width: "125px", padding: "0", height: "33px"}}>Create</SimpleButton>
                    </div>
                </div>

            </Main>
        </>
    )
}