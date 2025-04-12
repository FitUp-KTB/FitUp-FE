"use client"

import { Background1, Background2 } from "@/assets/images";
import {useEffect, useState} from "react";
import Image from "next/image";

const backgroundImages = [
  Background1, Background2
]

export default function GradientBackground() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0">
      {backgroundImages.map((src, i) => (
        <Image
          key={i}
          src={src}
          alt={`background-${i}`}
          layout="fill"
          objectFit="cover"
          className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  )
}
