export default function Layout({
  children,
  notifications,
  revenue,
  users,
  login,
}: {
  children: React.ReactNode;
  notifications: React.ReactNode;
  revenue: React.ReactNode;
  users: React.ReactNode;
  login: React.ReactNode;
}) {
  // toggle boolean and check conditional slot rendering in UI
  const isLoggedIn = false;

  return isLoggedIn ? (
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
  ) : (
    login
  );
}
