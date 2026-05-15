"use client";

import React from "react";
import { motion } from "framer-motion";

const ScrollingPark = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white border-y border-gray-100">
      <div className="flex w-full overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {/* We duplicate the image to create a seamless loop */}
          <div className="flex shrink-0">
            <img
              src="/images/cta-box-image.png"
              alt="Park Animation"
              className="h-[150px] md:h-[250px] w-auto object-contain"
            />
          </div>
          <div className="flex shrink-0">
            <img
              src="/images/cta-box-image.png"
              alt="Park Animation"
              className="h-[150px] md:h-[250px] w-auto object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollingPark;
