import { DashboardStatsT, TotalStatsT } from "@shared/Dashboard";
import { MetricContainer } from "./Container";

interface Props {
    data: TotalStatsT,
    title: string,
    Icon: any
}
export default function TotalMetricCard({data, Icon, title}: Props){
    return(
        <MetricContainer className="flex flex-col space-y-3">
            <div className="flex justify-between">
                <span className="text-gray-500">{title}</span>
                <Icon className = "text-secondary-blue" />
            </div>
            <div className="text-2xl font-bold text-secondary-blue">
                {data.value}
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-secondary-blue">{data.increase > 0 ?"+":""}{data.increase}%</span>
                <span className="text-gray-500">Since last month</span>
            </div>
        </MetricContainer>
    )
}