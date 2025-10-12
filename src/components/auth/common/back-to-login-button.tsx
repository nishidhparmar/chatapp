import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";

// src/components/common/back-to-login-button.tsx

export const BackToLoginButton = (props: React.ComponentProps<"button">) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(e);
    router.push("/login");
  };

  return (
    <Button
      type="button"
      variant={"outline"}
      className="w-full mt-3"
      {...props}
      onClick={handleClick}
    >
      <FiChevronLeft className="!h-5 !w-5 text-neutral-ct-tertiary font-semibold" />
      Back to login
    </Button>
  );
};
