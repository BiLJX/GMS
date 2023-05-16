import { Tbutton } from "components/Table/TableComponents";
import moment from "moment";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { RootState } from "redux/store"

export default function ExpiredMembersTable(){
    const data = useSelector((state: RootState)=>state.dashboard.data);
    const navigate = useNavigate();
    return(
        <table className="">
            <thead>
                <th className="p-4 text-left"></th>
                <th className="p-4 text-left font-medium text-gray-700">Name</th>
                <th className="p-4 text-left font-medium text-gray-700">Expire date</th>
                <th className="p-4 text-left font-medium text-gray-700">Action</th>
            </thead>
            <tbody>
                {data?.expired_memebrs.map((x, i)=>(
                    <tr>
                        <td className="p-4 text-left">{i + 1}</td>
                        <td className="p-4 text-left">{x.full_name}</td>
                        <td className="p-4 text-left">{moment(x.membership_status.expire_date).format("Do MMM, YYYY")}</td>
                        <td className="p-4 text-left">
                            <Tbutton onClick={()=>navigate("/members/renew/"+x.member_id)} disabled = {x.membership_status.status === "Active"} label="Renew" style={{backgroundColor: "#00FF38"}} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}