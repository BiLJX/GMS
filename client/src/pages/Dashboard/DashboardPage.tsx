import Main from "components/Container/Main";
import Header from "components/Header/Header";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { getDashboardStats } from "api/dashboard";
import { useLayoutEffect } from "react";
import { toastError } from "components/Toast/toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { addDashboard } from "redux/dashboardReducer";
import { MetricContainer } from "./Container";
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import TotalMetricCard from "./TotalMetricCard";
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { DailySalesGraph } from "./DailySalesGraph";
import { DailyMemberGraph } from "./DailyMemberGraph";
import PopularMembershipChart from "./PopularMembershipChart";
import ExpiredMembersTable from "./ExpiredMembersTable";

export default function DashboardPage(){
    const dashboardStats = useSelector((state: RootState) => state.dashboard.data);
    const dispatch = useDispatch();
    const fetchDashboarData = async() => {
        const res = await getDashboardStats();
        if(res.error) return toastError(res.message);
        dispatch(addDashboard(res.data));
    }
    useLayoutEffect(()=>{
        fetchDashboarData()
    }, []);
    if(!dashboardStats) return (
        <>
            <Header title="Dashboard" Icon={DashboardIcon} />
        </>
    )
    return(
        <>
            <Header title="Dashboard" Icon={DashboardIcon} />
            <Main className="flex flex-col space-y-2">
                <div className="flex space-x-2">
                    <div className="grid grid-cols-2 w-[440px] gap-2">
                        <TotalMetricCard Icon={PeopleIcon} data={dashboardStats.total_members} title="Total Members" />
                        <TotalMetricCard Icon={PersonIcon} data={dashboardStats.total_members_today} title = "Members Today" />
                        <TotalMetricCard Icon={PointOfSaleIcon} data={dashboardStats.total_monthly_sales} title="Monthly Sales" />
                        <TotalMetricCard Icon={ReceiptIcon} data={dashboardStats.total_sales_today} title="Sales Today" />
                    </div>
                    <MetricContainer className="flex flex-1 flex-col space-y-4">
                        <span className="text-gray-500">Daily Sales</span>
                        <div className="flex-1">
                            <DailySalesGraph />
                        </div>
                    </MetricContainer>
                </div>
                <div className="flex space-x-2">
                    <div className="flex flex-col flex-1 space-y-2">
                        <MetricContainer className="flex flex-1 flex-col space-y-4">
                            <span className="text-gray-500">Members</span>
                            <div className="flex-1">
                                <DailyMemberGraph />
                            </div>
                        </MetricContainer>
                        <MetricContainer style={{paddingTop: "0rem"}} className="flex flex-col space-y-2 h-[400px] overflow-x-hidden overflow-y-auto relative">
                            <div className="sticky top-0 bg-white-100 w-full py-4">Expired Memberships</div>
                            <ExpiredMembersTable />
                        </MetricContainer>
                    </div>
                    <div className="flex w-[400px]">
                        <MetricContainer className="flex flex-col w-full">
                            <div className="text-gray-500 text-center text-lg">Popular Memberships</div>
                            <div className="flex-1 flex items-center">
                                <PopularMembershipChart />
                            </div>
                            <div className="text-gray-200 text-center pb-4">
                                This metric shows the most popular membership categories in your gym.
                            </div>
                        </MetricContainer>
                    </div>
                </div>
            </Main>
        </>
    )
}
