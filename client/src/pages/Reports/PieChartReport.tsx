import { ReportStatsT } from "@shared/Report"
import { Doughnut } from "react-chartjs-2"
export default function PieChartReport({data}: {data: ReportStatsT[]}){
    if(!data.length) return <></>
    return(
        <Doughnut 
        data={{
            labels: data.map(x=>x.label),
            datasets: [{
                data: data.map(x=>x.value)
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