/* eslint-disable import/no-webpack-loader-syntax */
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import hello from "!!raw-loader!../examples/hello.qlm";
import basics from "!!raw-loader!../examples/basics.qlm";
import classes from "!!raw-loader!../examples/classes.qlm";
import linked_list from "!!raw-loader!../examples/linked_list.qlm";
import merge_sort from "!!raw-loader!../examples/merge_sort.qlm";

export type ExampleLoaderProps = {
  onSelect: (code: string) => void,
}

export default function ExampleLoader({ onSelect } : ExampleLoaderProps) {
  
  return (
    <Dropdown
      classNames={{
        base: "max-w-sm"
      }}
      
    >
      <DropdownTrigger>
        <Button
          variant="bordered"
          size="sm"
        >Load Example</Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" >
        <DropdownItem
          description="Basic hello world example (Islam inpsired!)."
          onPress={() => onSelect(hello)}
        >
          Hello World!
        </DropdownItem>
        <DropdownItem
          description="The absolute basics of programming; variable/function declarations, basic types, and control flow."
          onPress={() => onSelect(basics)}
        >
          Absolute Basics
        </DropdownItem>
        <DropdownItem
          description="Showcasing how to use classes and inheritance."
          onPress={() => onSelect(classes)}
        >
          Classes and Inheritance
        </DropdownItem>
        <DropdownItem
          description="Linked list construction and traversal."
          onPress={() => onSelect(linked_list)}
        >
          Linked List
        </DropdownItem>
        <DropdownItem
          description="Built-in functions and the merge sort algorithm."
          onPress={() => onSelect(merge_sort)}
        >
          Merge Sort
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}