import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const displayLimitedItems = (items) => {
  if (!Array.isArray(items)) return [items];
  return items.slice(0, 2);
};

const extractActualName = (fullName) => {
  const match = fullName.match(/\d+\.\s*\*(.*?)\*/);
  return match ? match[1] : fullName;
};

export default function Component({
  name,
  location,
  programs_offered,
  eligibility_criteria,
  course_duration,
  tution_fees,
  contacts,
  scholarships_offered,
}) {
  const actualName = extractActualName(name);

  return (
    <Card className="w-full max-w-md mx-auto h-[300px] bg-gray-200">
      <CardHeader className="pb-2">
        <CardTitle
          className="text-lg font-bold text-center truncate"
          title={actualName}
        >
          {actualName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{location}</span>
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-sm">Programs Offered:</h3>
          <ul className="list-disc pl-5 space-y-1">
            {displayLimitedItems(programs_offered).map((item, index) => (
              <li key={index} className="text-xs text-gray-600 truncate">
                {item}
              </li>
            ))}
            {programs_offered.length > 2 && (
              <li key="more" className="text-xs text-gray-600">
                ...
              </li>
            )}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-sm">Eligibility Criteria:</h3>
          <ul className="list-disc pl-5 space-y-1">
            {displayLimitedItems(eligibility_criteria).map((item, index) => (
              <li key={index} className="text-xs text-gray-600 truncate">
                {item}
              </li>
            ))}
            {eligibility_criteria.length > 2 && (
              <li key="more" className="text-xs text-gray-600">
                ...
              </li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
