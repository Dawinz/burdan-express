import React from 'react';

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: "url('/images/burdan-bus-15.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-burdan-black/60 via-burdan-black/30 to-burdan-red/80" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-burdan-cream to-transparent" />
    </div>
  );
};

export default Hero;
