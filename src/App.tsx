import { useState } from "react";
import CardCarousel from "./components/card-carousel";
import { Checkbox } from "./components/ui/checkbox";
import { cardsData } from "./dummydata/colleges";
import CarouselPage from "./pages/carosel";
import CourseSelector from "./pages/course";

function App() {
  const [selectedSubjects, setSelectedSubjects] = useState<string>("");
  const [stream, setStream] = useState<string>("");
  return (
    <div className="min-h-screen w-screen bg-red-50 flex flex-col justify-start items-center">
      <div className="w-full flex flex-col items-center py-12">
        <div className="text-center w-full">
          <h1 className="text-3xl font-bold mb-3">What Next?</h1>
          <h3 className="text-subtitle">
            A guide for highschool graduates in Nepal.
          </h3>
        </div>
        <div className="flex flex-col items-center mt-8 w-full">
          <CourseSelector
            props={{ selectedSubjects, setSelectedSubjects, stream, setStream }}
          />
        </div>
      </div>
      <div className="mt-8 w-full">
        <CarouselPage />
      </div>
    </div>
  );
}

export default App;
