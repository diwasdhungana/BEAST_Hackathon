import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

// type UniversityInfo = {
//   name: string;
//   location: string;
//   eligibility_criteria: string[];
//   course_duration: string;
//   tuition_fees: string;
//   programs_offered: string[];
//   scholarships_offered: string[];
//   contact: {
//     phone: string;
//     email: string;
//     address: string;
//   };
// };
const extractActualName = (fullName) => {
  const match = fullName.match(/\d+\.\s*\*(.*?)\*/);
  return match ? match[1] : fullName;
};

export default function Component({ props }) {
  const {
    cardsData,
    dataIndex,
    modalOpen,
    setModalOpen,
    setIsChatOpen,
    setInputMessage,
    textAreaRef,
  } = props;
  const universityInfo = {
    name: cardsData[dataIndex].name,
    location: cardsData[dataIndex].location,
    programs_offered: cardsData[dataIndex].programs_offered,
    eligibility_criteria: cardsData[dataIndex].eligibility_criteria,
    course_duration: cardsData[dataIndex].course_duration,
    tuition_fees: cardsData[dataIndex].tuition_fees,
    contact: cardsData[dataIndex].contact,
    scholarships_offered: cardsData[dataIndex].scholarships_offered,
    website: cardsData[dataIndex].website_url,
  };
  const actualName = extractActualName(universityInfo.name);

  return (
    <Dialog open={modalOpen} onOpenChange={() => setModalOpen(false)}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto bg-gray-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{actualName}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="w-full flex justify-between ">
            <Button className="bg-green-400 " variant="default">
              <a
                href={universityInfo.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                visit College's website
              </a>
            </Button>
            <Button
              className="bg-green-400"
              variant="default"
              onClick={() => {
                setInputMessage(
                  "Based on this College \nCollege's Name: " +
                    actualName +
                    "\nlocation: " +
                    universityInfo.location +
                    "\nI want to know \n" +
                    " "
                );
                setIsChatOpen(true);
                setModalOpen(false);
                setTimeout(() => {
                  if (textAreaRef.current) {
                    const textArea = textAreaRef.current;
                    const textLength = textArea.value.length;
                    textArea.setSelectionRange(textLength, textLength);
                  }
                }, 100);
              }}
            >
              Ask Bot <MessageCircle className="ml-2 h-6 w-6" />
            </Button>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            <p>{universityInfo.location}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Eligibility Criteria</h3>
            <ul className="list-disc pl-5 space-y-1">
              {universityInfo.eligibility_criteria?.map((criteria, index) => (
                <li key={index}>{criteria}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Course Duration</h3>
            <p>{universityInfo.course_duration}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Tuition Fees</h3>
            <p>{universityInfo.tuition_fees}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Programs Offered</h3>
            <ul className="list-disc pl-5 space-y-1">
              {universityInfo.programs_offered?.map((program, index) => (
                <li key={index}>{program}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Scholarships Offered</h3>
            <ul className="list-disc pl-5 space-y-1">
              {universityInfo.scholarships_offered?.map(
                (scholarship, index) => (
                  <li key={index}>{scholarship}</li>
                )
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
            <p>Phone: {universityInfo.contact?.phone}</p>
            <p>
              Email:{" "}
              <a
                href={`mailto:${universityInfo.contact?.email}`}
                className="text-blue-600 hover:underline"
              >
                {universityInfo.contact?.email}
              </a>
            </p>
            <p>Address: {universityInfo.contact?.address}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
