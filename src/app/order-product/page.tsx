"use client";
import { useRouter } from "next/navigation";

export default function OrderProduct() {
  const router = useRouter();

  function handleClick() {
    console.log("Place your order!");
    router.push("/");
  }

  return (
    <div className="">
      <h2>Order Product</h2>
      <button type="button" onClick={handleClick} className="btn">
        Order
      </button>
    </div>
  );
}
