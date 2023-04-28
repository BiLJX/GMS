import { AddonT } from "@shared/Addon";
import SearchBar from "components/SearchBar/TableSearchBar";
import ReactModal from "react-modal";
import { useState, useEffect } from "react";
import { getAddonList } from "api/addon";
import { toastError } from "components/Toast/toast";

interface SelectorProps {
    onClose: ()=>void;
}
export default function AddonSelector({onClose}:SelectorProps){
    const [addons, setAddons] = useState<AddonT[]>([]);
    const fetchAddon = async(search_name = "") => {
        const res = await getAddonList(search_name);
        if(res.error) return toastError(res.message);
        setAddons(res.data);
    }
    useEffect(()=>{
        fetchAddon()
    }, [])
    return(
        <ReactModal onRequestClose={onClose} shouldCloseOnEsc shouldCloseOnOverlayClick bodyOpenClassName="overflow-hidden" className="w-[500px] p-4 bg-white-100 rounded-lg flex flex-col h-[80vh]" isOpen overlayClassName="modal-overlay" >
            <div className="text-gray-700 font-medium w-full text-sm">Addons</div>  
            <div className="flex py-4 space-x-4">
                <SearchBar style={{flex: 1}} onSearch={fetchAddon} />  
                <button className="text-secondary-blue text-sm font-bold" onClick={onClose}>Done</button>
            </div>
            <div className="flex flex-col">
                {addons.map((x, i)=><AddonItem data = {x} key={i}  />)}
            </div>
        </ReactModal>
    )
}

interface AddonItemProps {
    data: AddonT,
    onAdd?: (addonItem: AddonT) => void,
    onRemove?: (addonItem: AddonT) => void, 
}
export function AddonItem({
    data,
    onAdd,
    onRemove
}: AddonItemProps){
    return(
        <div className="flex p-4 text-gray-500 border-b-[1px] border-gray-100 text-sm">
            <div className="w-[40%]">{data.addon_name}</div>
            <div className="flex-1">Rs {data.price}</div>
            <button className="font-bold text-secondary-blue">Add</button>
        </div>
    )
}