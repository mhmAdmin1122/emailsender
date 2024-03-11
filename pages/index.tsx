import Image from "next/image";
import React from "react";
import logo from "@/public/logo.jpg";

const Home = () => {
  return (
    <div className="message-box flex justify-center items-center h-screen">
      <div className="message-body shadow-xl shadow-gray-700 w-[500px] flex flex-col items-center gap-5 bg-gray-100 px-[20px] py-[40px] rounded-lg">
        <div className="flex items-center gap-3 flex-wrap">
          <Image
            src={logo}
            alt="logo-pic"
            className="w-[90px] h-[60px] logoPic"
          />
          <div className="flex flex-col gap-2 leading-4">
            <h1 className="font-bold text-3xl text-[#000]">Rise Marketing</h1>
            <p className="font-normal text-[20px] text-gray-400">
              A New Way of Digital World!
            </p>
          </div>
        </div>
        <div className="text-center flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl font-bold text-gray-500">Your OTP is</h1>
          <h4 className="text-2xl text-gray-400 font-medium">123456</h4>
          <p className="text-[18px] text-gray-600 font-medium">This OTP is to verify your identity. Do not share this with anyone.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
