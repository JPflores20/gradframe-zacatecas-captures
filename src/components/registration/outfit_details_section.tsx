import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface OutfitDetailsProps {
  student_height: string;
  set_student_height: (value: string) => void;
  show_errors: boolean;
}

export const OutfitDetailsSection = ({
  student_height,
  set_student_height,
  show_errors
}: OutfitDetailsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg border-b pb-2">Detalles Vestimenta</h3>
      <div className="space-y-2">
        <Label htmlFor="height" className={show_errors && !student_height ? "text-destructive" : ""}>Estatura (cm o metros) *</Label>
        <Input 
          id="height" 
          placeholder="Ej. 1.75m o 175cm" 
          value={student_height} 
          onChange={(event) => set_student_height(event.target.value)} 
          required 
          className={show_errors && !student_height ? "border-destructive focus-visible:ring-destructive" : ""}
        />
      </div>
    </div>
  );
};