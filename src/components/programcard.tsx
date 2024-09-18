import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

// Note: In a real application, you would import faker properly.
// For this example, we'll mock the faker function.
const faker = {
  lorem: {
    sentences: (num: number) => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  }
}

export default function Component() {
  const name = "John Doe"
  const location = "New York, NY"
  const programsOffered = faker.lorem.sentences(2)
  const eligibilitycriteria = "+2 pass"

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Programs Offered:</h3>
          <p className="text-sm text-gray-600">{programsOffered}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Eligibility Criteria:</h3>
          <p className="text-sm text-gray-600">{eligibilitycriteria}</p>
        </div>
      </CardContent>
    </Card>
  )
}