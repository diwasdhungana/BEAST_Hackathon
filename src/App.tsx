import { useState } from "react";
import axios from "axios";
import CourseSelector from "./pages/course";
import Location from "./pages/location";
import Intrest from "./pages/intrest";
import { Button } from "./components/ui/button";
import CarouselPage from "./pages/carosel";
import { cardsData } from "@/dummydata/colleges";
import ProgramSelector from "./pages/program";
import Modal from "./components/modal";

function App() {
  const [selectedSubjects, setSelectedSubjects] = useState<string>("");
  const [stream, setStream] = useState<string>("");
  // const [intrest, setIntrest] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [program, setProgram] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [dataIndex, setDataIndex] = useState<number>();

  const [caroselCardData, setCaroselCardData] = useState(cardsData);

  const handleSubmit = async () => {
    const formData = {
      subjects: selectedSubjects,
      stream,
      intrest: program,
      location,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/recommend",
        formData
      );
      console.log("Form submitted successfully:", response.data);
      setCaroselCardData(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  // console.log(cardsData[1]);
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
          {/* <Intrest props={{ intrest, setIntrest }} /> */}
          <ProgramSelector props={{ program, setProgram, selectedSubjects }} />
        </section>

        <Button
          onClick={handleSubmit}
          disabled={!stream || !location || program === ""}
          variant="default"
        >
          Submit
        </Button>
      </main>
      <div className="mt-8 w-full">
        <CarouselPage props={{ cardsData, setModalOpen, setDataIndex }} />
        {dataIndex !== undefined && (
          <Modal
            props={{
              cardsData,
              dataIndex: dataIndex,
              modalOpen,
              setModalOpen,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
