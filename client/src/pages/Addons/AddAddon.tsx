import Header from "components/Header/Header";
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import Main from "components/Container/Main";
import { InputLabel, TextField } from "@mui/material";
import { TwoButton } from "components/Button/buttons";
export default function AddAddon(){
    return(
        <>
            <Header title="Addons" Icon={NoteAddOutlinedIcon}  />
            <Main className="flex items-center justify-center h-[100vh]">
                <div className="p-8 bg-white-100 rounded-lg w-[500px] flex flex-col space-y-8">
                    <div className="text-gray-700 font-medium text-center text-xl">Add Addons</div>
                    <div className="flex flex-col space-y-4">
                        <div className="flex flex-col space-y-2">
                            <InputLabel>Addon Name</InputLabel>
                            <TextField autoComplete="off" variant="outlined" placeholder="Shower..." size="small" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <InputLabel>Price</InputLabel>
                            <TextField type="number" autoComplete="off" variant="outlined" placeholder="Rs Price" size="small" />
                        </div>
                    </div>
                    
                    <TwoButton cancelLabel="Cancel">Add</TwoButton>
                </div>
            </Main>
        </>
    )
}