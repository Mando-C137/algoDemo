import React from "react";
import DropdownIcon from "../../components/ui/icons/DropdownIcon";
import { Listbox } from "@headlessui/react";
import CheckIcon from "./icons/CheckIcon";

type Props<T extends string> = {
  value: T;
  options: T[];
  setValue: React.Dispatch<React.SetStateAction<T>>;
};

const SortAlgorithmListbox = <T extends string>({
  value,
  options,
  setValue,
}: Props<T>) => {
  return (
    <Listbox value={value} onChange={setValue}>
      <div className="relative  text-slate-950">
        <Listbox.Button className="relative flex justify-center w-28 md:w-40 items-center text-sm md:text-md  text-slate-950 ring-1  ring-slate-950 rounded-lg py-1 px-2 bg-slate-50">
          <span className="block truncate pr-2 ">{value}</span>
          <DropdownIcon className="h-4 w-4 ml-auto"></DropdownIcon>
        </Listbox.Button>
        <Listbox.Options className="z-10 absolute w-full mt-1 pt-1 ring-1 ring-slate-950 bg-slate-50 rounded-md">
          {options.map((option) => (
            <Listbox.Option
              key={option}
              value={option}
              className={({ active }) =>
                `${active ? "font-bold bg-white" : "font-medium"}
                 relative select-none text-sm md:text-base rounded-md px-2 cursor-pointer bg-white`
              }
            >
              {({ selected }) => (
                <>
                  <span
                    className={`${
                      selected ? "font-bold  bg-white" : "font-medium"
                    }`}
                  >
                    {option}
                  </span>
                  {selected ? (
                    <span className="hidden md:flex absolute pointer-events-none inset-y-0 right-0 items-center pr-3 text-green-400">
                      <CheckIcon className=" h-4 w-4" />
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};

export default SortAlgorithmListbox;
