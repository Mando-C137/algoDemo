import { RadioGroup } from "@headlessui/react";
import React, { Fragment } from "react";

type Props<T extends string> = {
  options: T[];
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
};

const SortRadiogroup = <T extends string>({
  value,
  setValue,
  options,
}: Props<T>) => {
  return (
    <>
      <RadioGroup value={value} onChange={setValue} className="flex">
        <RadioGroup.Label className="text-lg text-slate-950">
          Ausrichtung
        </RadioGroup.Label>
        {options.map((option) => (
          <RadioGroup.Option key={option} value={option} as={Fragment}>
            {({ active, checked }) => (
              <li
                className={`${
                  active ? "bg-blue-500 text-white" : "bg-white text-black"
                }`}
              >
                {option}
              </li>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </>
  );
};

export default SortRadiogroup;
