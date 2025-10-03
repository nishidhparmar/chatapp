import { PiCaretLeft } from "react-icons/pi";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";

const ForgotPasswordPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-full space-y-8 max-w-[422px] rounded-lg border border-neutral-br-primary p-6">
        <div>
          <Text variant="heading4" className="p-0 justify-start">
            Forgot Password?
          </Text>
        </div>

        <form className="space-y-8">
          <div className="space-y-3">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email address"
            />
          </div>

          <div className="space-y-3">
            <Button
              variant="primaryDefault"
              className="w-full font-semibold text-sm cursor-pointer"
            >
              Send Reset Link
            </Button>
            <Button
              type="button"
              variant="tertiaryDefault"
              className="flex items-center justify-center gap-2 w-full font-semibold text-sm cursor-pointer border-neutral-br-primary border-[1px]"
            >
              <PiCaretLeft className="text-neutral-ct-tertiary" /> Back to Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
