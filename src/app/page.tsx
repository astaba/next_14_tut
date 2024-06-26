import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Welcome home!</h1>
      <nav className="">
        <Link className="link" href="/blog">
          Blog
        </Link>
        <Link className="link" href="/products">
          Products
        </Link>
        <Link className="link" href="/order-product">
          Order Products
        </Link>
        <Link className="link" href="/complex-dashboard">
          Complex Dashboard
        </Link>
      </nav>
    </>
  );
}
