import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPinIcon } from "lucide-react";

export default function CustomCardComponent({
  heading,
  imageUrl,
  location,
  customField,
  description,
}) {
  return (
    <Card className="w-[350px] overflow-hidden">
      <CardContent className="p-6">
        <h2 className="text-xl font-medium mb-4 line-clamp-2">{heading}</h2>
        <img
          src={imageUrl}
          alt="Card image"
          className="w-full h-[200px] object-cover mb-4 rounded-md"
        />
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPinIcon className="w-4 h-4 mr-1" />
          <span>{location}</span>
        </div>
        <div className="text-sm mb-4">
          <span className="font-semibold">Alliliation: </span>
          <span className="text-muted-foreground">{customField}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
          {description}
        </p>
        <Button variant="link" className="p-0 h-auto text-sm">
          Read more
        </Button>
      </CardContent>
    </Card>
  );
}
