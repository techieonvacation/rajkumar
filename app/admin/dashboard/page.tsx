import { getDashboardStats } from "@/lib/actions/admin";
import { DashboardContent } from "./dashboard-content";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { stats, recentContacts, recentPosts, activityLogs } =
    await getDashboardStats();

  return (
    <DashboardContent
      stats={stats}
      recentContacts={recentContacts}
      recentPosts={recentPosts}
      activityLogs={activityLogs}
    />
  );
}
