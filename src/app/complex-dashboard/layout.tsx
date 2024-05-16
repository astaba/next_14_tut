import Notifications from "@/components/Notifications";
import RevenueMetrics from "@/components/RevenueMetrics";
import UserAnalytics from "@/components/UserAnalytics";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>{children}</div>
      <div className="flex justify-stretch">
        <div className="flex-col">
          <UserAnalytics />
          <RevenueMetrics />
        </div>
        <div className="flex">
          <Notifications />
        </div>
      </div>
    </>
  );
}
