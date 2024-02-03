import DashboardProvider from "../../../Utility/Providers/DashboardProvider";
import DashboardLayout from "../../features/dashboard/DashboardLayout";
function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardLayout />
    </DashboardProvider>
  );
}

export default Dashboard;
