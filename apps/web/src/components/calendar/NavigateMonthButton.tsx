import { Button } from "@repo/ui";

type NavigateMonthButtonProps = {
  onClick: () => void;
  children: string;
};

export default function NavigateMonthButton({
  onClick,
  children,
}: NavigateMonthButtonProps) {
  return (
    <Button variant="outline" size="icon" className="shadow-md" onClick={onClick}>
      {children}
    </Button>
  );
}
