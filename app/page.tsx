import Link from "next/link";

export default function Home({}) {
  return (
    <div className="flex flex-row gap-2 justify-center items-center w-screen h-screen bg-stone-100 text-stone-800">
      <Link className="hover:underline text-xl" href={"/contact"}>
        Contact
      </Link>{" "}
      |
      <Link className="hover:underline text-xl" href={"/shop/tins"}>
        Shop Tins
      </Link>
      |
      <Link className="hover:underline text-xl" href={"/shop/jars"}>
        Shop Jars
      </Link>
      |
      <Link className="hover:underline text-xl" href={"/shop/starter"}>
        Shop Starter
      </Link>
      |
      <Link className="hover:underline text-xl" href={"/shop/store"}>
        Shop All
      </Link>
      |
      <Link className="hover:underline text-xl" href={"/tutorials"}>
        Tutorials
      </Link>{" "}
      |
      <Link className="hover:underline text-xl" href={"/shop/products/testing"}>
        Individual Product Page
      </Link>
      |
      <Link className="hover:underline text-xl" href={"/testing"}>
        Component Testing
      </Link>
      |
      <Link className="hover:underline text-xl" href={"/cart"}>
        Cart
      </Link>
    </div>
  );
}
