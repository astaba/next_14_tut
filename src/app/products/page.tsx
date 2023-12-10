import Link from "next/link";

export default function Products() {
  return (
    <>
      <h1>Products Page</h1>
      <Link href={"/"}>Home</Link>
      <ul>
        <li>
          <h2>
            <Link href={"/products/1"}>Product 1</Link>
          </h2>
        </li>
        <li>
          <h2>
            <Link href={"/products/2"}>Product 2</Link>
          </h2>
        </li>
        <li>
          <h2>
            <Link href={"/products/3"} replace>
              Product 3
            </Link>
          </h2>
        </li>
      </ul>
    </>
  );
}
