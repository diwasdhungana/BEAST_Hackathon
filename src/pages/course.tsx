import {
  Calculator,
  Atom,
  ChevronsUpDown,
  Scale,
  PenTool,
  Users,
  Microchip,
  BookMarked,
  BookOpen,
} from "lucide-react";

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

  const subjectOptions = {
    Science: [
      "PCM (Physics, Chemistry, Mathematics)",
      "PCB (Physics, Chemistry, Biology)",
    ],
    Management: ["Business Studies", "Accountancy", "Economics", "Mathematics"],
    Humanities_and_Social_Sciences: [
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
    Technical_and_Vocational: [
      "Civil Engineering",
      "Computer Science",
      "Electrical Engineering",
      "Mechanical Engineering",
    ],
    Fine_Arts: ["Visual Arts", "Music", "Theater", "Dance"],
  };

  const [open, setOpen] = useState(false);
  return (
    <>
      <h3 className="text-subtitle text-center mb-4">
        Which subject did you graduate with in highschool?
      </h3>
      <div className="flex justify-center w-full">
        {selectedSubjects ? (
          <div className="flex align-middle">
            <Badge variant="secondary">Stream:</Badge>
            <div className="flex flex-wrap gap-1 p-4 self-center">
              <Badge variant="default">{stream}</Badge>
            </div>
            <Badge variant="secondary">Your subjects:</Badge>
            <div className="flex flex-wrap gap-1 p-4 self-center">
              <Badge variant="default">{selectedSubjects}</Badge>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="flex justify-center w-[400px] ">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              // aria-expanded={open}
              className="w-full justify-between "
            >
              <div className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                {selectedSubjects ? selectedSubjects : "Select course."}
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
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
                    {subjectOptions.Science.map((subject) => (
                      <CommandItem key={subject}>
                        <Checkbox
                          id={subject}
                          checked={selectedSubjects === subject}
                          onCheckedChange={() => {
                            setStream("Science");
                            setSelectedSubjects(
                              (prev: string) =>
                                prev === subject
                                  ? setSelectedSubjects("") // Uncheck (remove subject)
                                  : setSelectedSubjects(subject) // Check (add subject)
                            );
                            setOpen(false);
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
                    {subjectOptions.Management.map((subject) => (
                      <CommandItem key={subject}>
                        <Checkbox
                          id={subject}
                          checked={selectedSubjects === subject}
                          onCheckedChange={() => {
                            setStream("Management");
                            setSelectedSubjects(
                              (prev: string) =>
                                prev === subject
                                  ? setSelectedSubjects("") // Uncheck (remove subject)
                                  : setSelectedSubjects(subject) // Check (add subject)
                            );
                            setOpen(false);
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
                        <Scale className="mr-2 h-4 w-4" />
                        Law
                      </span>
                    }
                  >
                    {subjectOptions.Law.map((subject) => (
                      <CommandItem key={subject}>
                        <Checkbox
                          id={subject}
                          checked={selectedSubjects === subject}
                          onCheckedChange={() => {
                            setStream("Law");
                            setSelectedSubjects(
                              (prev: string) =>
                                prev === subject
                                  ? setSelectedSubjects("") // Uncheck (remove subject)
                                  : setSelectedSubjects(subject) // Check (add subject)
                            );
                            setOpen(false);
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
                        <Users className="mr-2 h-4 w-4" />
                        Humanities and Social Science
                      </span>
                    }
                  >
                    {subjectOptions.Humanities_and_Social_Sciences.map(
                      (subject) => (
                        <CommandItem key={subject}>
                          <Checkbox
                            id={subject}
                            checked={selectedSubjects === subject}
                            onCheckedChange={() => {
                              setStream("Humanities and Social Science");
                              setSelectedSubjects(
                                (prev: string) =>
                                  prev === subject
                                    ? setSelectedSubjects("") // Uncheck (remove subject)
                                    : setSelectedSubjects(subject) // Check (add subject)
                              );
                              setOpen(false);
                            }}
                          />
                          <label htmlFor={subject} className="ml-2">
                            {subject}
                          </label>
                        </CommandItem>
                      )
                    )}
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup
                    heading={
                      <span className="flex">
                        <BookMarked className="mr-2 h-4 w-4" />
                        Education
                      </span>
                    }
                  >
                    {subjectOptions.Education.map((subject) => (
                      <CommandItem key={subject}>
                        <Checkbox
                          id={subject}
                          checked={selectedSubjects === subject}
                          onCheckedChange={() => {
                            setStream("Education");
                            setSelectedSubjects(
                              (prev: string) =>
                                prev === subject
                                  ? setSelectedSubjects("") // Uncheck (remove subject)
                                  : setSelectedSubjects(subject) // Check (add subject)
                            );
                            setOpen(false);
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
                        <Microchip className="mr-2 h-4 w-4" />
                        Technical and Vocational
                      </span>
                    }
                  >
                    {subjectOptions.Technical_and_Vocational.map((subject) => (
                      <CommandItem key={subject}>
                        <Checkbox
                          id={subject}
                          checked={selectedSubjects === subject}
                          onCheckedChange={() => {
                            setStream("Technical and Vocational");
                            setSelectedSubjects(
                              (prev: string) =>
                                prev === subject
                                  ? setSelectedSubjects("") // Uncheck (remove subject)
                                  : setSelectedSubjects(subject) // Check (add subject)
                            );
                            setOpen(false);
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
                        <PenTool className="mr-2 h-4 w-4" />
                        Fine Arts
                      </span>
                    }
                  >
                    {subjectOptions.Fine_Arts.map((subject) => (
                      <CommandItem key={subject}>
                        <Checkbox
                          id={subject}
                          checked={selectedSubjects === subject}
                          onCheckedChange={() => {
                            setStream("Fine Arts");
                            setSelectedSubjects(
                              (prev: string) =>
                                prev === subject
                                  ? setSelectedSubjects("") // Uncheck (remove subject)
                                  : setSelectedSubjects(subject) // Check (add subject)
                            );
                            setOpen(false);
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
      </div>
    </>
  );
}
