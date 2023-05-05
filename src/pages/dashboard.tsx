
import { useQuery } from "react-query";
import AdminProfile from "../components/AdminProfile";
import ViewProfile from "../components/ViewProfile";
import DashboardLayout from "../layout/DashboardLayout";
import { authService } from "../services/auth.service";

export default function Dashboard() {
  const { data } = useQuery('viewProfile', async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await authService.viewProfile(config);
    return response.data;
  });
  return (
    <DashboardLayout>
      {data?.role === "ADMIN" ?
        <AdminProfile />
        : <ViewProfile />
      }


    </DashboardLayout>
  )
}
