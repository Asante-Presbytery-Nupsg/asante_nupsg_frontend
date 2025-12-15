import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
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

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  value: string;
  onChange: (value: string) => void;
  options: ComboboxOption[];
  placeholder?: string;
  label?: string;
  error?: { message?: string };
  searchPlaceholder?: string;
  onSearch?: (search: string) => void;
  isLoading?: boolean;
}

export function Combobox({
  value,
  onChange,
  options,
  placeholder = "Select option...",
  label,
  error,
  searchPlaceholder,
  onSearch,
  isLoading = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const handleSearchChange = (search: string) => {
    setSearchValue(search);
    if (onSearch) {
      onSearch(search);
    }
  };

  return (
    <div className="w-full space-y-2">
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
            className={`w-full h-10 justify-between ${
              error ? "border-red-500" : ""
            }`}
          >
            <span className="truncate">
              {value
                ? options.find((option) => option.value === value)?.label
                : placeholder}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
                searchPlaceholder || `Search ${placeholder.toLowerCase()}...`
              }
              value={searchValue}
              onValueChange={handleSearchChange}
            />
            <CommandList>
              {isLoading ? (
                <div className="py-6 text-center text-sm text-slate-500">
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
                      >
                        <Check
                          className={
                            value === option.value
                              ? "mr-2 h-4 w-4 opacity-100"
                              : "mr-2 h-4 w-4 opacity-0"
                          }
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
