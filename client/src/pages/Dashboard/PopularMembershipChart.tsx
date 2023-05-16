import { Doughnut } from "react-chartjs-2"
import { useSelector } from "react-redux"
import { RootState } from "redux/store"
export default function PopularMembershipChart(){
    const data = useSelector((state: RootState) => state.dashboard.data);
    if(!data) return <></>
    return(
        <Doughnut 
        data={{
            labels: data.membership_category.map(x=>x.membership_name),
            datasets: [{
                data: data.membership_category.map(x=>x.total_members)
            }]
        }}
        options={{
            plugins: {
                legend: {
                    align: "center",
                    position: "bottom",
                    fullSize: true,
                    labels: {
                        padding: 20,
                        boxPadding: 20,
                        textAlign: "center",
                    }
                }
            }
        }}
        />
    )
}