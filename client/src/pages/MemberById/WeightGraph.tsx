import { WeightStatsT } from "@shared/Weight";
import { Line } from "react-chartjs-2";

export default function WeightGraph({data}: {data: WeightStatsT[]}){
    return(
        <Line data = {{
            labels: data.map(x=>x.date),
            datasets: [{
                data: data.map(x=>x.value),
                tension: 0.3,
                borderColor: "#5B5F97",
                backgroundColor: (context)=>{
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, "#5B5F974b");
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