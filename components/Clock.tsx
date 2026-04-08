"use client";

import React, { useEffect, useState } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const sec = time.getSeconds();
  const min = time.getMinutes();
  const hr = time.getHours() % 12;

  const secDeg = sec * 6;
  const minDeg = min * 6 + sec * 0.1;
  const hrDeg = hr * 30 + min * 0.5;
  return (
    <div>
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <div className="flex justify-center mb-1">
          <div className="w-px h-5 bg-amber-400" />
        </div>

        <div className="relative w-36 h-36 rounded-full bg-stone-100 border-8 border-amber-800 shadow-lg flex items-center justify-start">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-full"
              style={{ transform: `rotate(${i * 30}deg)` }}
            >
              <div
                className={`absolute top-1 left-1/2 -translate-x-1/2 bg-amber-800 rounded-full ${i % 3 === 0 ? "w-1.5 h-3" : "w-1 h-2"}`}
              />
            </div>
          ))}

          <div
            className="absolute bottom-1/2 left-1/2 origin-bottom rounded-full bg-amber-900"
            style={{
              width: "4px",
              height: "38px",
              marginLeft: "-2px",
              transform: `rotate(${hrDeg}deg)`,
              transition: "transform 0.5s ease",
            }}
          />

          <div
            className="absolute bottom-1/2 left-1/2 origin-bottom rounded-full bg-amber-800"
            style={{
              width: "3px",
              height: "50px",
              marginLeft: "-1.5px",
              transform: `rotate(${minDeg}deg)`,
              transition: "transform 0.5s ease",
            }}
          />

          <div
            className="absolute bottom-1/2 left-1/2 origin-bottom rounded-full bg-rose-500"
            style={{
              width: "2px",
              height: "54px",
              marginLeft: "-1px",
              transform: `rotate(${secDeg}deg)`,
              transition: "transform 0.3s ease",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Clock;
