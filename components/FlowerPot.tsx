function FlowerPot({
  className,
  petalColor,
  centerColor,
  stemColor,
}: {
  className?: string;
  petalColor: string;
  centerColor: string;
  stemColor: string;
}) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative w-14 h-14 flex items-center justify-center mb-0.5">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <div
            key={deg}
            className={`absolute w-4 h-4 rounded-full ${petalColor} opacity-90`}
            style={{ transform: `rotate(${deg}deg) translateY(-10px)` }}
          />
        ))}
        <div
          className={`relative z-10 w-5 h-5 rounded-full ${centerColor} border-2 border-yellow-400`}
        />
      </div>

      <div className={`w-1 h-10 ${stemColor} rounded`} />

      <div className="flex flex-col items-center">
        <div className="w-14 h-2 bg-amber-600 rounded-t" />
        <div className="w-12 h-8 bg-amber-700 rounded-b-lg" />
        <div className="absolute" style={{ marginTop: "2px" }}>
          <div className="w-11 h-1 bg-amber-900 rounded opacity-60" />
        </div>
      </div>
    </div>
  );
}

export default FlowerPot;
