import { Calculator, Atom, ChevronsUpDown } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CommandDemo({ props }) {
  const { selectedSubjects, setSelectedSubjects, stream, setStream } = props;
  const streams = [
    "Science",
    "Management",
    "Humanities and Social Sciences",
    "Education",
    "Law",
    "Technical and Vocational",
    "Fine Arts",
  ];

  const subjectOptions = {
    Science: [
      "PCM (Physics, Chemistry, Mathematics)",
      "PCB (Physics, Chemistry, Biology)",
    ],
    Management: ["Business Studies", "Accountancy", "Economics", "Mathematics"],
    "Humanities and Social Sciences": [
      "Sociology",
      "Psychology",
      "Political Science",
      "Economics",
    ],
    Education: ["Education", "English", "Mathematics", "Science"],
    Law: [
      "Constitutional Law",
      "Civil Law",
      "Criminal Law",
      "International Law",
    ],
    Technica_lnd_Vocational: [
      "Civil Engineering",
      "Computer Science",
      "Electrical Engineering",
      "Mechanical Engineering",
    ],
    Fine_Arts: ["Visual Arts", "Music", "Theater", "Dance"],
  };

  const locations = [
    "Kathmandu",
    "Pokhara",
    "Biratnagar",
    "Bharatpur",
    "Lalitpur",
    "Any location in Nepal",
  ];

  const [open, setOpen] = useState(false);

  console.log(selectedSubjects);
  return (
    <>
      <h3 className="text-subtitle text-center mb-4">
        Which subject did you graduate with in highschool?
      </h3>
      <div className="flex justify-center w-full">
        {selectedSubjects.length > 0 ? (
          <div className="flex align-middle">
            <Badge variant="secondary">Your subjects:</Badge>
            <div className="flex flex-wrap gap-1 p-4 self-center">
              <Badge key={subject} variant="primary">
                {selectedSubjects}
              </Badge>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="flex justify-center w-[400px] ">
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              Select courses...
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <div className="flex justify-center w-[400px] bg-white ">
            <Command className="rounded-lg border shadow-md md:max-w-[450px]">
              <CommandInput placeholder="Type a subject to search." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup
                  heading={
                    <span className="flex">
                      <Atom className="mr-2 h-4 w-4" />
                      Science
                    </span>
                  }
                >
                  {ScienceSubjects.map((subject) => (
                    <CommandItem key={subject}>
                      <Checkbox
                        id={subject}
                        checked={selectedSubjects.includes(subject)}
                        onCheckedChange={() => {
                          setSelectedSubjects(
                            (prev) =>
                              prev.includes(subject)
                                ? prev.filter((s) => s !== subject) // Uncheck (remove subject)
                                : [...prev, subject] // Check (add subject)
                          );
                        }}
                      />
                      <label htmlFor={subject} className="ml-2">
                        {subject}
                      </label>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup
                  heading={
                    <span className="flex">
                      <Calculator className="mr-2 h-4 w-4" />
                      Management
                    </span>
                  }
                >
                  {ManagementSubjects.map((subject) => (
                    <CommandItem key={subject}>
                      <Checkbox
                        id={subject}
                        checked={selectedSubjects.includes(subject)}
                        onCheckedChange={() => {
                          setSelectedSubjects(
                            (prev) =>
                              prev.includes(subject)
                                ? prev.filter((s) => s !== subject) // Uncheck (remove subject)
                                : [...prev, subject] // Check (add subject)
                          );
                        }}
                      />
                      <label htmlFor={subject} className="ml-2">
                        {subject}
                      </label>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
