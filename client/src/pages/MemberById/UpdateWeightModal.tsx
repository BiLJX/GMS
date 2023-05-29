import { InputAdornment, OutlinedInput, TextField } from "@mui/material";
import { updateWeight } from "api/weight";
import { TwoButton } from "components/Button/buttons";
import { toastError } from "components/Toast/toast";
import { useState } from "react";
import ReactModal from "react-modal";
import { useNavigate, useParams } from "react-router-dom";

interface ModalProps {
    onClose: ()=>void
}
export default function UpdateWeightModal({onClose}: ModalProps){
    const [weight, setWeight] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const id = useParams().id || "";
    const onUpdate = async() => {
        setLoading(true);
        const res = await updateWeight(id, parseInt(weight));
        setLoading(false)
        if(res.error) return toastError(res.message);
        navigate(-1)
    }
    return(
        <ReactModal shouldCloseOnEsc shouldFocusAfterRender = {false} shouldCloseOnOverlayClick onRequestClose={onClose} className="w-[500px] p-6 bg-white-100 rounded-lg flex flex-col space-y-4" overlayClassName="modal-overlay" isOpen>
            <div className="text-lg text-gray-700 font-medium">Update Weight</div>
            <OutlinedInput 
            autoComplete="off" 
            autoCorrect="off" 
            size = "small" 
            placeholder="Weight"
            onChange={e=>setWeight(e.target.value)}
            endAdornment = {<InputAdornment position = "end">kg</InputAdornment>}
            />
            <TwoButton onClick={onUpdate} loading = {loading} loadingLabel="Updating..." onCancel={onClose} cancelLabel="Cancel">Update</TwoButton>
        </ReactModal>
    )
}