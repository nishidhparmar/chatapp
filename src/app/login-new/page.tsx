import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="flex h-screen items-start justify-start">
      <div className="w-[60%] shrink-0 h-full bg-[#FBFBFA]">
        <Image
          src={"/images/login.png"}
          alt={"login"}
          width={1000}
          height={1000}
          className="h-full object-contain"
        />
      </div>
      <div className="w-[40%] shrink-0 h-full flex items-center justify-center">
        <div className="w-[422px] h-auto border-[1px] border-neutral-br-primary rounded-2xl p-6 space-y-8">
          <Text variant={"heading4"} className="text-left">
            Login
          </Text>
          <div className="space-y-3">
            <div className="space-y-[6px]">
              <Text variant={"bodyMediumRegular"}>Email</Text>
              <input
                placeholder="Enter your email address"
                type="text"
                className="border-[1px] rounded-lg w-full focus:outline-none h-[44px] px-4 py-3 border-neutral-br-primary placeholder:text-neutral-ct-placeholder placeholder:text-[14px] font-normal"
              />
            </div>
            <div className="space-y-[6px]">
              <Text variant={"bodyMediumRegular"}>Password</Text>
              <input
                type="text"
                className="border-[1px] rounded-lg w-full h-[44px] px-4 py-3 border-neutral-br-primary focus:outline-none placeholder:text-neutral-ct-placeholder placeholder:text-[14px] font-normal"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div className="space-y-3">
            <Button
              variant={"primaryDefault"}
              className="w-full font-semibold text-[14px] cursor-pointer"
            >
              Log In
            </Button>
            <Button
              variant={"tertiaryDefault"}
              className="w-full font-semibold text-[14px] cursor-pointer border-neutral-br-primary border-[1px]"
            >
              Sign in with SSO
            </Button>
          </div>
          <Text variant={"bodySmallRegular"} className="text-center">
            Looking to add IntellektAI to your project?{" "}
            <span className="text-brand-ct-brand font-semibold cursor-pointer">
              Get in touch
            </span>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default page;
