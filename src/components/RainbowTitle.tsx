import React from "react";

interface RainbowTitleProps {
  children: React.ReactNode;
}

const RainbowTitle: React.FC<RainbowTitleProps> = ({ children }) => {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="relative mb-8 animate-rainbow-pulse bg-[linear-gradient(to_right,#6366f1,#ec4899,#ef4444,#eab308,#22c55e,#3b82f6,#6366f1)] bg-[length:200%_auto] bg-clip-text text-center font-stardos text-8xl font-normal uppercase tracking-[.15em] text-transparent drop-shadow-[0_0_40px_rgba(99,102,241,0.8)] transition-transform duration-300 hover:scale-110">
        {children}
      </h1>
    </div>
  );
};

export default RainbowTitle;
