import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";

export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Text variant={'bodyLargeSemiBold'} className=" text-neutral-ct-secondary ">The quick brown fox jumps over the lazy dog</Text>
      {/* <Button variant={"tertiaryDanger"} className="font-inter">ASD</Button> */}
    </div>
  );
}
