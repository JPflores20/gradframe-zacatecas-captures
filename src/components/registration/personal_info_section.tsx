import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalInfoProps {
  student_name: string;
  set_student_name: (value: string) => void;
  phone_number: string;
  set_phone_number: (value: string) => void;
}

export const PersonalInfoSection = ({
  student_name,
  set_student_name,
  phone_number,
  set_phone_number
}: PersonalInfoProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg border-b pb-2">Datos Personales</h3>
      <div className="space-y-2">
        <Label htmlFor="name">Nombre Completo *</Label>
        <Input 
          id="name" 
          placeholder="Ej. Juan Pérez" 
          value={student_name} 
          onChange={(event) => set_student_name(event.target.value)} 
          required 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Número Telefónico *</Label>
        <Input 
          id="phone" 
          type="tel" 
          placeholder="Ej. 492 123 4567" 
          value={phone_number} 
          onChange={(event) => set_phone_number(event.target.value)} 
          required 
        />
      </div>
    </div>
  );
};
