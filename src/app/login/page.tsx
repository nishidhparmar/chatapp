import Image from "next/image";

import { IMAGE_PATH } from "@/constant";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full bg-background grid md:grid-cols-12">
      {/* Illustration - visible from md and up */}
      <div className="relative bg-[#FBFBFA] hidden md:block md:col-span-7">
        <Image
          src={IMAGE_PATH.LANDING_PAGE_IMAGE}
          alt="Landing"
          fill
          priority
        />
      </div>

      {/* Right: Login panel (full screen on small) */}
      <div className="flex min-h-screen items-center justify-center p-6 sm:p-8 md:col-span-5">
        <div className="w-full space-y-8 max-w-[422px] rounded-lg border border-neutral-br-primary p-6">
          <div className="w-full">
            <Text variant="heading4" className="p-0 justify-start">
              Login
            </Text>
          </div>

          <form className="space-y-8">
            <div className="space-y-3">
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email address"
                autoComplete="email"
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>

            <div className="space-y-3">
              <Button
                type="submit"
                className="w-full text-sm font-semibold cursor-pointer"
                variant="primaryDefault"
              >
                Log In
              </Button>

              <Button
                type="button"
                variant="tertiaryDefault"
                className="w-full text-sm font-semibold border border-neutral-br-primary cursor-pointer"
              >
                Sign in with SSO
              </Button>
            </div>
          </form>

          <p className="text-center text-neutral-ct-primary text-xs">
            Looking to add IntelektAI to your project?{" "}
            <a
              className="underline-offset-0 text-brand-ct-brand font-semibold"
              href="#"
            >
              Get in touch
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
