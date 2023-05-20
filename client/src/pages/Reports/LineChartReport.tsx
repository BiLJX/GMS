import { ReportStatsT } from "@shared/Report";
import { Line } from "react-chartjs-2";

export function LineChartReport({data}: {data: ReportStatsT[]}){
    return(
        <Line data = {{
            labels: data.map(x=>x.label),
            datasets: [{
                data: data.map(x=>x.value),
                tension: 0.3,
                borderColor: "#ED254E",
                backgroundColor: (context)=>{
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, "#ED254E4b");
                    gradient.addColorStop(1, "#FFFFFF00");
                    return gradient;
                },
                fill: true,
            }]
        }} 
        options = {{
            plugins: {
                legend: {
                    display: false
                },
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    ticks: {
                        // stepSize: 1,
                        precision: 0
                    },
                    grid: {
                        display: false
                    }
                },
            },
        }}
        />
    )
}