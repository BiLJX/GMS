import Main from "components/Container/Main";
import Header from "components/Header/Header";
import TableSearchBar from "components/SearchBar/TableSearchBar";
import { SimpleButton } from "components/Button/buttons";
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { useNavigate } from "react-router-dom";
export default function AddonsPage(){
    const navigate = useNavigate();
    return(
        <>
            <Header title="Addons" Icon={NoteAddOutlinedIcon}  />
            <Main>
                <div className="p-4 bg-white-100 rounded-lg flex flex-col space-y-8">
                    <div className="text-gray-700 font-medium">Addons</div>
                    <div className="flex space-x-3">
                        <TableSearchBar style = {{flex: "1"}} />
                        <SimpleButton onClick={()=>navigate("add")} style={{fontSize: ".9rem", width: "125px", padding: "0", height: "33px"}}>Add</SimpleButton>
                    </div>
                </div>
            </Main>
        </>
    )
}