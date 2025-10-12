import { cn } from "@/lib/utils";
import Link from "next/link";

const ILink = ({
  children,
  className,
  href,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <Link
      href={href ?? "#"}
      className={cn("text-brand-ct-brand font-semibold", className)}
      {...props}
    >
      {children}
    </Link>
  );
};
export default ILink;
