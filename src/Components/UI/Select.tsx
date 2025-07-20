'use client';

import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/16/solid';
import { CheckIcon } from '@heroicons/react/20/solid';
import type { IStatus } from '../../interface';
import { Statuses } from '../../Data';

interface IProps {
  selected: IStatus;
  setSelected: (status: IStatus) => void;
}

const Select = ({ selected, setSelected }: IProps) => {
  return (
    <div>

      <div className="relative mt-2 h-7">
        <Listbox value={selected} onChange={setSelected}>
          <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm">
            <span className="block truncate">{selected.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {Statuses.map((status, index) => (
              <Listbox.Option
                key={index}
                value={status}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-3 pr-9 ${
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  }`
                }
              >
                <span className="block truncate">{status.label}</span>
                {selected.name === status.name && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
    </div>
  );
};

export default Select;
