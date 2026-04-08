function Spiral() {
  return (
    <div className="h-5 w-sm bg-[#E8E0D8] border-b rounded-t-xl border-gray-200 flex items-center justify-center gap-4 px-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="relative w-4 h-4">
          <div className="absolute inset-0 rounded-full border-[1.5px] border-gray-400" />
          <div className="absolute inset-0.75 rounded-full border-[1.5px] border-gray-400" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1.5px] h-1 bg-gray-400" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] h-1 bg-gray-400" />
        </div>
      ))}
    </div>
  );
}

export default Spiral;
