type NavigateMonthButtonProps = {
  onClick: () => void;
  children: string;
};

export default function NavigateMonthButton({
  onClick,
  children,
}: NavigateMonthButtonProps) {
  return (
    <button
      //className=" bg-zinc-500 hover:bg-zinc-700 border border-zinc-600 text-white-500 font-bold py-2 px-4 rounded"
      className="text-white bg-secondary text-secondary-foreground p-2 rounded-lg hover:bg-secondary/80 shadow-md"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
