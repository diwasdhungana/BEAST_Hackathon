import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, MapPin } from "lucide-react";

const location = ({ props }) => {
  const { location, setLocation } = props;
  const locations = [
    "Kathmandu",
    "Pokhara",
    "Biratnagar",
    "Bharatpur",
    "Lalitpur",
    "Any location in Nepal",
  ];
  return (
    <div className="flex justify-center w-[400px] ">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-[400px]">
          <Button
            variant="outline"
            role="combobox"
            // aria-expanded={open}
            className="w-full justify-between"
          >
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              {location ? location : "Select locations..."}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[400px] bg-white">
          {locations.map((loc) => (
            <DropdownMenuItem key={loc} onClick={() => setLocation(loc)}>
              {loc}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default location;
