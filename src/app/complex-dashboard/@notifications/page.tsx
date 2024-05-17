import Card from "@/components/Card";
import Link from "next/link";

export default function Notifications() {
  return (
    <Card>
      <h2>Notifications</h2>
      <Link href="/complex-dashboard/archived">Archived</Link>
    </Card>
  );
}
