import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const containerVariants = cva("mx-auto w-full px-4", {
  variants: {
    size: {
      base: "max-w-[1761px]",
      wide: "max-w-[1761px]",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

type ContainerBaseProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof containerVariants>;

export default function Container({
  size,
  children,
  className,
  ...props
}: ContainerBaseProps) {
  return (
    <div className={cn(containerVariants({ size }), className)} {...props}>{children}</div>
  );
}
