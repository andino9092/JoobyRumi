import Loading from "./Loading";

export default function DashboardAdBreak({}) {
  return (
    <div className="w-screen h-[600px] relative py-12">
      <div
        id="verticalText1"
        className="flex text-3xl gap-4 z-20 flex-col absolute left-0 ml-4"
      >
        {["J", "O", "O", "B", "Y"].map((char: string, i: number) => {
          return <div key={i}>{char}</div>;
        })}
      </div>
      <Loading className="w-[500px] h-[300px] absolute left-12"></Loading>
      <div
        id="verticalText2"
        className="flex text-3xl gap-4 z-20 flex-col absolute right-0 bottom-0 mr-4"
      >
        {["R", "O", "O", "M", "I"].map((char: string, i: number) => {
          return <div key={i}>{char}</div>;
        })}
      </div>
    </div>
  );
}
