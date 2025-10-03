import React from "react";
import Text from "@/components/ui/Text";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const NewPasswordPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-full space-y-8 max-w-[422px] rounded-lg border border-neutral-br-primary p-6">
        <div>
          <Text variant="heading4" className="p-0 justify-start">
            Create New Password
          </Text>
          <Text
            variant="bodySmallRegular"
            className="p-0 justify-start text-neutral-ct-secondary text-xs"
          >
            Password must be minimum 8 characters and use at least 1 number and
            1 special character.
          </Text>
        </div>
        <form className="space-y-8">
          <div className="space-y-3">
            <Input
              label="New Password"
              type="password"
              placeholder="Enter your new password"
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your new password"
            />
          </div>

          <div>
            <Button
              variant="primaryDefault"
              className="w-full font-semibold text-[14px] cursor-pointer"
              disabled
            >
              Reset Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPasswordPage;
