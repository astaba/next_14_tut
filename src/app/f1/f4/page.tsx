import Link from "next/link";

const F4 = () => {
  return (
    <>
      <h1>F4 page</h1>
      <p>
        <Link href="/f1/f3">F3</Link>
      </p>
      <p>
        <Link href="/about">About</Link>
      </p>
    </>
  );
};

export default F4;
