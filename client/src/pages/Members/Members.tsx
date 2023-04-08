import Main from "components/Container/Main";
import Header from "components/Header/Header";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import TableSearchBar from "components/SearchBar/TableSearchBar";
import { SimpleButton } from "components/Button/buttons";
export default function Members(){
    return(
        <>
            <Header title="Members" Icon={PeopleAltOutlinedIcon}  />
            <Main>
                <div className="p-4 bg-white-100 rounded-lg flex flex-col space-y-8">
                    <div className="text-gray-700 font-medium">Members</div>
                    <div className="flex space-x-3">
                        <TableSearchBar style = {{flex: "1"}} />
                        <SimpleButton style={{fontSize: ".9rem", width: "125px", padding: "0", height: "33px"}}>Create</SimpleButton>
                    </div>

                </div>

            </Main>
        </>
    )
}