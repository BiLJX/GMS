import { SimpleButton } from "components/Button/buttons";
import { useLayoutEffect, useState } from "react";
import ReactModal from "react-modal";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

export default function Invoice({onClose, isOpen}: {onClose: ()=>void, isOpen: boolean}){
    const create_member_data = useSelector((state: RootState)=>state.create_member_data);
    const membership_type = create_member_data.membership_type;
    const calcTotal = () => {
        console.log(create_member_data)
        const membership_price = (membership_type?.price || 0);
        const addons_price = create_member_data.addons.reduce((prev, x)=>prev + x.price, 0)
        const discount_percentage = create_member_data.discount;
        const sub_total = membership_price + addons_price;
        const total = sub_total - ((discount_percentage/100) * sub_total);
        return {total, sub_total}
    }
    return(
        <ReactModal shouldCloseOnOverlayClick shouldCloseOnEsc onRequestClose={onClose} className="flex flex-col p-6 w-[550px] h-[90vh] bg-white-100 rounded-lg" bodyOpenClassName="overflow-hidden" overlayClassName="modal-overlay" isOpen = {isOpen}>
            <div className="text-gray-700 font-medium w-full text-right text-2xl mb-6">INVOICE</div>  
            <table className="w-full">
                <thead className="border-b-[1px]">
                    <th className="font-medium p-2 text-left w-[70%]">Description</th>
                    <th className="font-medium p-2 text-left">Amount</th>
                </thead>
                <tbody>
                    <TableItem description={membership_type?.membership_name || "Membership Not Selected"} amount={membership_type?.membership_type_id ? "Rs "+membership_type.price : "N/A"} />
                    { create_member_data.addons.map((x, i)=><TableItem description={x.addon_name} amount={"Rs " + x.price} key = {i} />)}
                    <TableItem description="Discount Percentage" amount={create_member_data.discount + "%"} />
                    <TableItem description="Sub Total" amount={"Rs " + calcTotal().sub_total} />
                    <tr>
                        <td className="text-gray-700 font-medium px-2 py-4 text-left w-[70%]">TOTAL</td>
                        <td className="text-gray-700 font-medium px-2 py-4 text-left">Rs {calcTotal().total}</td>
                    </tr>
                </tbody>
            </table>
            <SimpleButton onClick={onClose} style={{marginTop: "auto"}}>Done</SimpleButton>
        </ReactModal>
    )
}

function TableItem({description, amount}: {description: string, amount: string | number}){
    return(
        <tr className="border-b-[1px] border-gray-100 text-sm">
            <td className="text-gray-200 font-medium px-2 py-4 text-left w-[70%]">{description}</td>
            <td className="text-gray-200 font-medium px-2 py-4 text-left">{amount||"N/A"}</td>
        </tr>
    )
}