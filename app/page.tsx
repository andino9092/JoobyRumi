import Link from "next/link";
import HomePicture from "./components/HomePicture";
import Category from "./components/Category";
import Loading from "./components/Loading";
import Button from "./components/Button";

export default function Home({}) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center w-screen h-auto font-DMSerifDisplay tracking-wide bg-joobyWhite text-joobyDark">
      <HomePicture></HomePicture>
      <div className="flex flex-col gap-10 h-auto pb-10">
        <div className="flex flex-col gap-4 pt-4">
          <h1 className="ml-48 text-2xl">Shop by Category</h1>
          <div className="flex gap-12 justify-center flex-row">
            <Link href={"/shop/jars"}>
              <Category>Shop Jooby Jars</Category>
            </Link>
            <Link href={"/shop/starter"}>
              <Category>Shop Findings</Category>
            </Link>
            <Link href={"/shop/tins"}>
              <Category>Shop Tins</Category>
            </Link>
            <Link href={"/shop/store"}>
              <Category>Shop All</Category>
            </Link>
          </div>
        </div>

        <div>
          <div className="w-screen h-[700px] bg-joobyLightPink flex items-center gap-24 justify-center flex-row">
            <Loading className="w-[900px] h-[640px] object-cover "></Loading>
            <section className="flex flex-col gap-8 items-center justify-center basis-1/4">
              <h1 className="text-5xl">Jooby Newbie Kit</h1>
              <article className="text-center">
                The all included beginner friendly kit fit for anyone and
                everyone!
              </article>
              <Button className="w-[300px] py-3 hover:bg-joobyWhite hover:scale-110 hover:text-joobyDark transition-all">
                Shop
              </Button>
            </section>
          </div>
          <div className="w-screen h-[700px] bg-joobyWhite flex items-center gap-24 justify-center flex-row">
            <section className="flex flex-col gap-8 items-center justify-center basis-1/4">
              <h1 className="text-5xl">Ad Break</h1>
              <article className="text-center">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage...
              </article>
              <Button className="w-[300px] py-3 hover:bg-stone-200 hover:scale-110 hover:text-joobyDark transition-all">
                Shop
              </Button>
            </section>
            <Loading className="w-[900px] h-[640px] object-cover "></Loading>
          </div>
        </div>
        <div className="w-screen flex justify-center">
          <div className="w-10/12 border-b-2"></div>
        </div>
        <div className="flex flex-col gap-4 pt-4">
          <h1 className="ml-48 text-2xl">Shop Jooby</h1>
          <div className="flex gap-12 justify-center flex-row">
            <Category>
              <div>Cluster Bracelet</div>
              <div>$10.00</div>
            </Category>
            <Category>
              <div>Cluster Bracelet</div>
              <div>$10.00</div>
            </Category>
            <Category>
              <div>Cluster Bracelet</div>
              <div>$10.00</div>
            </Category>
            <Category>
              <div>Cluster Bracelet</div>
              <div>$10.00</div>
            </Category>
          </div>
        </div>
      </div>
    </div>
  );
}
