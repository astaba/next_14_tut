import Card from "@/components/Card";
import Link from "next/link";

export default function ArchivedNotifications() {
  return (
    <Card>
      <h2>Archived Notifications</h2>
      <Link href="/complex-dashboard">Default</Link>
    </Card>
  );
}
