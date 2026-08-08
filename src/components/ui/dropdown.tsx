type DropdownProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  width?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function Dropdown({
  trigger,
  children,
  width,
  open,
  onOpenChange,
}: DropdownProps) {
  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="cursor-pointer"
        onClick={() => onOpenChange(!open)}
        aria-expanded={open}
      >
        {trigger}
      </button>
      {open && (
        <div
          className={`absolute right-0 top-full z-50 mt-2 max-h-125 overflow-y-auto rounded-lg scrollbar-thin border border-muted bg-card p-2 shadow-lg ${width}`}
        >
          <div onClick={() => onOpenChange(!open)}>{children}</div>
        </div>
      )}
    </div>
  );
}
