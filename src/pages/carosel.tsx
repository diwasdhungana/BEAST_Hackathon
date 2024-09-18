import CardCarousel from "../components/card-carousel";
import { cardsData } from "@/dummydata/colleges";

// const cardsData = [
//   {
//     heading: "Beautiful Sunset View",
//     imageUrl: "https://picsum.photos/seed/pic1/350/200",
//     location: "Malibu, California",
//     customField: "Beachfront Property",
//     description:
//       "Experience breathtaking sunsets from this stunning beachfront property. Perfect for romantic getaways or family vacations.",
//   },
//   {
//     heading: "Cozy Mountain Retreat",
//     imageUrl: "https://picsum.photos/seed/pic2/350/200",
//     location: "Aspen, Colorado",
//     customField: "Ski-in/Ski-out",
//     description:
//       "Nestled in the heart of the Rockies, this cozy cabin offers direct access to world-class ski slopes and hiking trails.",
//   },
//   {
//     heading: "Urban Loft with Skyline Views",
//     imageUrl: "https://picsum.photos/seed/pic3/350/200",
//     location: "New York City, New York",
//     customField: "Penthouse Suite",
//     description:
//       "Live in luxury with panoramic views of the Manhattan skyline. This modern loft features high-end amenities and easy access to city attractions.",
//   },
//   {
//     heading: "Tropical Paradise Villa",
//     imageUrl: "https://picsum.photos/seed/pic4/350/200",
//     location: "Bali, Indonesia",
//     customField: "Private Pool",
//     description:
//       "Escape to your own slice of paradise in this luxurious villa. Featuring a private pool and lush gardens, it's the perfect tropical getaway.",
//   },
//   {
//     heading: "Historic Downtown Apartment",
//     imageUrl: "https://picsum.photos/seed/pic5/350/200",
//     location: "Charleston, South Carolina",
//     customField: "Restored 1800s Building",
//     description:
//       "Step back in time in this beautifully restored apartment. Enjoy the charm of historic architecture with modern comforts.",
//   },
// ];

export default function CarouselPage() {
  return (
    <div className="container mx-auto py-12">
      <CardCarousel cards={cardsData} />
    </div>
  );
}
