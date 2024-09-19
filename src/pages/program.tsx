import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronsUpDown, Edit, List, Target } from "lucide-react";

const ProgramSelector = ({ props }) => {
  const { program, setProgram, selectedSubjects } = props;
  const [isManualInput, setIsManualInput] = useState(false);
  const [manualInput, setManualInput] = useState("");

  const programs = {
    "PCM (Physics, Chemistry, Mathematics)": [
      "Civil Engineering",
      "Mechanical Engineering",
      "Computer Engineering",
      "Electrical Engineering",
      "Architecture",
      "Aeronautical Engineering",
    ],
    "PCB (Physics, Chemistry, Biology)": [
      "MBBS",
      "BDS",
      "Nursing",
      "Pharmacy",
      "Veterinary Science",
      "Biotechnology",
    ],
    "Business Studies": [
      "BBA (Bachelor of Business Administration)",
      "BBM (Bachelor of Business Management)",
      "MBA (Master of Business Administration)",
    ],
    Accountancy: [
      "CA (Chartered Accountancy)",
      "ACCA (Association of Chartered Certified Accountants)",
      "BBS (Bachelor of Business Studies)",
    ],
    Mathematics: [
      "B.Sc. in Mathematics",
      "M.Sc. in Mathematics",
      "Actuarial Science",
      "Data Science",
    ],
    Sociology: [
      "B.A. in Sociology",
      "M.A. in Sociology",
      "Social Work",
      "Anthropology",
    ],
    Psychology: [
      "B.A. in Psychology",
      "M.A. in Psychology",
      "Counseling Psychology",
    ],
    "Political Science": [
      "B.A. in Political Science",
      "M.A. in Political Science",
      "International Relations",
    ],
    Economics: [
      "B.A. in Economics",
      "M.A. in Economics",
      "Development Studies",
      "Financial Economics",
    ],
    Education: [
      "B.Ed. in Education",
      "M.Ed. in Education",
      "Curriculum and Instruction",
    ],
    English: [
      "B.A. in English",
      "M.A. in English",
      "Linguistics",
      "Literature",
    ],
    Science: [
      "B.Sc. in General Science",
      "M.Sc. in General Science",
      "Environmental Science",
      "Geology",
    ],
    "Constitutional Law": [
      "LL.B. (Bachelor of Laws)",
      "LL.M. in Constitutional Law",
      "Judicial Services",
    ],
    "Civil Law": ["LL.M. in Civil Law", "Civil Code Studies", "Legal Practice"],
    "Criminal Law": [
      "LL.M. in Criminal Law",
      "Criminology",
      "Criminal Justice",
    ],
    "International Law": [
      "LL.M. in International Law",
      "Human Rights Law",
      "Diplomatic Law",
    ],
    "Civil Engineering": [
      "B.E. in Civil Engineering",
      "M.E. in Civil Engineering",
      "Structural Engineering",
    ],
    "Computer Science": [
      "B.Sc. in Computer Science",
      "M.Sc. in Computer Science",
      "Artificial Intelligence",
      "Software Engineering",
    ],
    "Electrical Engineering": [
      "B.E. in Electrical Engineering",
      "M.E. in Electrical Engineering",
      "Power Systems",
    ],
    "Mechanical Engineering": [
      "B.E. in Mechanical Engineering",
      "M.E. in Mechanical Engineering",
      "Automobile Engineering",
    ],
    "Visual Arts": [
      "BFA (Bachelor of Fine Arts)",
      "MFA (Master of Fine Arts)",
      "Graphic Design",
      "Painting",
    ],
    Music: [
      "B.A. in Music",
      "M.A. in Music",
      "Ethnomusicology",
      "Hindustani Classical Music",
    ],
    Theater: ["BFA in Theater Arts", "MFA in Theater Arts", "Dramatic Arts"],
    Dance: [
      "B.A. in Dance",
      "M.A. in Dance",
      "Classical Dance",
      "Contemporary Dance",
    ],
  };

  // Dynamically select programs based on selected subject
  const availablePrograms = programs[selectedSubjects] || [];

  const handleManualInput = (e) => {
    setManualInput(e.target.value);
    setProgram(e.target.value);
  };

  const toggleInputMode = () => {
    setIsManualInput(!isManualInput);
    if (isManualInput) {
      setProgram("");
    } else {
      setManualInput("");
    }
  };

  return (
    <div className="flex flex-col items-center w-[400px]">
      {isManualInput ? (
        <Input
          type="text"
          placeholder="Type your program"
          value={manualInput}
          onChange={handleManualInput}
          className="w-full"
        />
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full" disabled={!selectedSubjects}>
            <Button
              variant="outline"
              role="combobox"
              // aria-expanded={open}
              className="w-full justify-between"
            >
              <div className="flex items-center">
                <Target className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                {program
                  ? program
                  : selectedSubjects
                  ? "Select a Program"
                  : "Select a subject first"}
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </DropdownMenuTrigger>

          {selectedSubjects && (
            <DropdownMenuContent className="w-[400px] bg-white">
              {availablePrograms.map((prog) => (
                <DropdownMenuItem key={prog} onClick={() => setProgram(prog)}>
                  {prog}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      )}
      <div className="flex justify-between w-full mb-2">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleInputMode}
          className="flex items-center "
        >
          {isManualInput ? (
            <List className="mr-2" />
          ) : (
            <Edit className="mr-2" />
          )}
          {isManualInput ? "or Select from list" : "or Type Instead"}
        </Button>
      </div>
    </div>
  );
};

export default ProgramSelector;
