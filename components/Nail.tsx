function Nail() {
  return (
    <>
      <div className="flex flex-col items-center mb-0.5">
        <div className="w-3.5 h-1.5 rounded bg-linear-to-r from-gray-400 via-gray-200 to-gray-500 shadow shadow-gray-400" />
        <div className="w-1 h-4 bg-linear-to-r from-gray-500 via-gray-300 to-gray-600" />
        <div
          className="w-0 h-0"
          style={{
            borderLeft: "4px solid transparent",
            borderRight: "4px solid transparent",
            borderTop: "7px solid #555",
          }}
        />
      </div>

      <div className="w-0.5 h-5 bg-[#8A7A6A]" />
    </>
  );
}

export default Nail;
