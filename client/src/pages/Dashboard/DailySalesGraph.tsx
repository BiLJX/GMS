import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { Line } from "react-chartjs-2";
export function DailySalesGraph(){
    const dashboardStats = useSelector((state: RootState) => state.dashboard.data);
    if(!dashboardStats) return <></>
    return(
        <Line data = {{
            labels: dashboardStats.daily_sales.map(x=>x.date),
            datasets: [{
                data: dashboardStats.daily_sales.map(x=>x.value),
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