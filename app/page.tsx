import Link from "next/link";
import HomePicture from "./components/HomePicture";
import Category from "./components/Category";
import Loading from "./components/Loading";
import Button from "./components/Button";
import DashboardFade from "./components/DashboardFade";
import StaggeredCarousel from "./components/StaggeredCarousel";
import { StaggeredCarouselProps } from "./utils/interfaces";
import DashboardAdBreak from "./components/DashboardAdBreak";

export default function Home({}) {
  const firstCarousel: StaggeredCarouselProps = {
    heading: "Shop by Category",
    children: [
      {
        href: "/shop/jars",
        label: "Shop Jooby Jars",
      },
      {
        href: "/shop/starter",
        label: "Shop Findings",
      },
      {
        href: "/shop/tins",
        label: "Shop Tins",
      },
      {
        href: "/shop/store",
        label: "Shop All",
      },
    ],
  };

  const secondCarousel: StaggeredCarouselProps = {
    heading: "Shop Jooby",
    children: [
      {
        href: "",
        label: (
          <div>
            <div>Cluster Bracelet</div>
            <div className='font-DMSans'>$10.00</div>
          </div>
        ),
      },
      {
        href: "",
        label: (
          <div>
            <div>Cluster Bracelet</div>
            <div className='font-DMSans'>$10.00</div>
          </div>
        ),
      },
      {
        href: "",
        label: (
          <div>
            <div>Cluster Bracelet</div>
            <div className='font-DMSans'>$10.00</div>
          </div>
        ),
      },
      {
        href: "",
        label: (
          <div>
            <div>Cluster Bracelet</div>
            <div className='font-DMSans'>$10.00</div>
          </div>
        ),
      },
    ],
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center w-screen h-auto font-DMSerifDisplay tracking-wide bg-joobyWhite text-joobyDark">
      <DashboardFade>
        <HomePicture></HomePicture>
      </DashboardFade>
      <div className="flex flex-col gap-10 h-auto pb-10">
        <StaggeredCarousel {...firstCarousel}></StaggeredCarousel>
        <div className="flex sm:gap-10 flex-col">
          <DashboardFade
            delay={0.1}
            className="w-screen h-auto sm:h-[700px] pb-10 bg-joobyLightPink flex items-center gap-24 justify-center flex-col sm:flex-row"
          >
            <Loading className="w-[350px] rounded-xl overflow-hidden h-[350px] mt-8 sm:w-[900px] sm:h-[640px] object-cover shadow-[3px_2px_30px_-20px_rgba(0,0,0,0.3)]"></Loading>
            <section className="flex flex-col gap-8 pb-4 items-center justify-center basis-1/4">
              <h1 className="text-5xl">Jooby Newbie Kit</h1>
              <article className="text-center font-DMSans mx-12 sm:mx-0">
                The all included beginner friendly kit fit for anyone and
                everyone!
              </article>
              <Button className="w-[300px] py-3 hover:bg-stone-200 hover:scale-110 hover:text-joobyDark transition-all">
                Shop
              </Button>
            </section>
          </DashboardFade>
          <DashboardFade
            delay={0.1}
            className="w-screen h-auto sm:h-[700px] bg-joobyWhite flex items-center gap-24 justify-center flex-col sm:flex-row-reverse"
          >
            <Loading className="w-[350px] rounded-xl overflow-hidden h-[350px] mt-8 sm:w-[900px] sm:h-[640px] object-cover shadow-[3px_2px_30px_-20px_rgba(0,0,0,0.3)]"></Loading>
            <section className="flex flex-col sm:flex-col gap-8 items-center justify-center basis-1/4">
              <h1 className="text-5xl">Ad Break</h1>
              <article className="text-center font-DMSans mx-12 sm:mx-0">
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
          </DashboardFade>
          {/* <DashboardAdBreak></DashboardAdBreak> */}
        </div>
        <DashboardFade className="w-screen flex justify-center">
          <div className="w-10/12 border-b-2"></div>
        </DashboardFade>
        <StaggeredCarousel {...secondCarousel}></StaggeredCarousel>
      </div>
    </div>
  );
}
