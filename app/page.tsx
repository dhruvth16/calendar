import Calendar from "@/components/Calendar";
import Clock from "@/components/Clock";
import FlowerPot from "@/components/FlowerPot";
import Nail from "@/components/Nail";
import Spiral from "@/components/Spiral";

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full border-t border-amber-900"
            style={{ top: `${i * 10}%` }}
          />
        ))}
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-14 bg-amber-700" />
      <div className="fixed bottom-14 left-0 right-0 h-2 bg-amber-600" />
      <FlowerPot
        className="fixed bottom-14 right-20"
        petalColor="bg-rose-400"
        centerColor="bg-yellow-300"
        stemColor="bg-green-600"
      />

      <div className="absolute left-1/4 hidden lg:block">
        <Clock />
      </div>
      <div className="relative flex items-center justify-center flex-col py-3">
        <Nail />
        <div className="swing">
          <Spiral />
        </div>
        <Calendar />
      </div>
    </div>
  );
}
