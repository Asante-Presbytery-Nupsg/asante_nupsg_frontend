import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

/* ---------------------------------- Types --------------------------------- */

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  value?: string;
  onChange: (value: string) => void;
  options?: ComboboxOption[]; // ✅ async-safe
  placeholder?: string;
  label?: string;
  error?: { message?: string };
  searchPlaceholder?: string;
  onSearch?: (search: string) => void;
  isLoading?: boolean;
  className?: string;
  clearable?: boolean;

  /** Truncate long option labels */
  truncateOptions?: boolean;

  /** Extra class for option label */
  optionClassName?: string;
}

/* -------------------------------- Component ------------------------------- */

export function Combobox({
  value = "",
  onChange,
  options = [], // ✅ fallback prevents crash
  placeholder = "Select option...",
  label,
  error,
  className,
  searchPlaceholder,
  onSearch,
  isLoading = false,
  clearable = false,
  truncateOptions = false,
  optionClassName,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const selectedLabel = React.useMemo(
    () => options.find((o) => o.value === value)?.label,
    [options, value]
  );

  const handleSearchChange = (search: string) => {
    setSearchValue(search);
    onSearch?.(search);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation(); // ✅ prevents popover toggle
    onChange("");
    setSearchValue("");
    setOpen(false);
  };

  return (
    <div className="w-full space-y-2 relative">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full h-10 justify-between",
              error && "border-red-500",
              className
            )}
          >
            <span className="truncate">{selectedLabel || placeholder}</span>

            <div className="flex items-center gap-1">
              {clearable && value && (
                <span
                  role="button"
                  aria-label="Clear selection"
                  onClick={handleClear}
                  className="p-1 rounded hover:bg-muted text-muted-foreground"
                >
                  <X className="h-3 w-3" />
                </span>
              )}
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </div>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="p-0"
          align="start"
          style={{ width: "var(--radix-popover-trigger-width)" }}
        >
          <Command shouldFilter={!onSearch}>
            <CommandInput
              placeholder={
                searchPlaceholder ?? `Search ${placeholder.toLowerCase()}...`
              }
              value={searchValue}
              onValueChange={handleSearchChange}
            />

            <CommandList>
              {isLoading ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  Loading...
                </div>
              ) : (
                <>
                  <CommandEmpty>No option found.</CommandEmpty>

                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={() => {
                          onChange(option.value);
                          setOpen(false);
                          setSearchValue("");
                        }}
                        className="flex items-center"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === option.value ? "opacity-100" : "opacity-0"
                          )}
                        />

                        <span
                          className={cn(
                            "flex-1",
                            truncateOptions && "truncate",
                            optionClassName
                          )}
                          title={option.label}
                        >
                          {option.label}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error?.message && (
        <p className="text-sm text-red-500">{error.message}</p>
      )}
    </div>
  );
}
