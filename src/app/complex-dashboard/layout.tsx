export default function Layout({
  children,
  notifications,
  revenue,
  users,
}: {
  children: React.ReactNode;
  revenue: React.ReactNode;
  notifications: React.ReactNode;
  users: React.ReactNode;
}) {
  return (
    <>
      <div>{children}</div>
      <div className="flex justify-stretch">
        <div className="flex-col">
          {users}
          {revenue}
        </div>
        <div className="flex">{notifications}</div>
      </div>
    </>
  );
}
