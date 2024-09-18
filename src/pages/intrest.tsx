import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function TextareaWithText({ props }) {
  const { intrest, setIntrest } = props;
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message-2">Your Interest</Label>
      <Textarea
        placeholder="I would like to explore options in civil engineering ..."
        id="message-2"
        value={intrest}
        onChange={(e) => setIntrest(e.target.value)}
      />
      <p className="text-sm text-muted-foreground">
        Results will be inclined towards your interest.
      </p>
    </div>
  );
}
