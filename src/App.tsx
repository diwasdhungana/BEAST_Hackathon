import { useState } from "react";
import axios from "axios";
import CourseSelector from "./pages/course";
import Location from "./pages/location";
import Intrest from "./pages/intrest";
import { Button } from "./components/ui/button";
import CarouselPage from "./pages/carosel";

function App() {
  const [selectedSubjects, setSelectedSubjects] = useState<string>("");
  const [stream, setStream] = useState<string>("");
  const [intrest, setIntrest] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const handleSubmit = async () => {
    const formData = {
      selectedSubjects,
      stream,
      intrest,
      location,
    };

    try {
      const response = await axios.post("https://example.com/submit", formData);
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-red-50 flex flex-col justify-start items-center">
      <header className="w-full text-center py-12">
        <h1 className="text-3xl font-bold mb-3">What Next?</h1>
        <h3 className="text-lg text-gray-700">
          A guide for highschool graduates in Nepal
        </h3>
      </header>

      <main className="w-full flex flex-col items-center gap-8">
        <section className="w-full flex flex-col items-center">
          <CourseSelector
            props={{
              selectedSubjects,
              setSelectedSubjects,
              stream,
              setStream,
            }}
          />
        </section>

        <section className="w-[400px] flex flex-col items-center">
          <Location props={{ location, setLocation }} />
        </section>

        <section className="w-[400px] flex flex-col items-center">
          <Intrest props={{ intrest, setIntrest }} />
        </section>

        <Button
          onClick={handleSubmit}
          disabled={!stream || !location || intrest === ""}
          variant="default"
        >
          Submit
        </Button>
      </main>
      <div className="mt-8 w-full">
        <CarouselPage />
      </div>
    </div>
  );
}

export default App;
