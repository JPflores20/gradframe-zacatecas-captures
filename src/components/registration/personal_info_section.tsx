import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalInfoProps {
  student_name: string;
  set_student_name: (value: string) => void;
  phone_number: string;
  set_phone_number: (value: string) => void;
  show_errors: boolean;
}

export const PersonalInfoSection = ({
  student_name,
  set_student_name,
  phone_number,
  set_phone_number,
  show_errors
}: PersonalInfoProps) => {

  // Función para permitir solo números y un máximo de 10 dígitos
  const handle_phone_change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Elimina cualquier caracter que no sea un número
    if (value.length <= 10) {
      set_phone_number(value);
    }
  };

  // Verificamos si hay error (si se intentó enviar y el número no tiene 10 dígitos)
  const is_phone_invalid = show_errors && phone_number.length !== 10;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg border-b pb-2">Datos Personales</h3>
      <div className="space-y-2">
        <Label htmlFor="name" className={show_errors && !student_name ? "text-destructive" : ""}>
          Nombre Completo *
        </Label>
        <Input 
          id="name" 
          placeholder="Ej. Juan Pérez" 
          value={student_name} 
          onChange={(event) => set_student_name(event.target.value)} 
          required 
          className={show_errors && !student_name ? "border-destructive focus-visible:ring-destructive" : ""}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone" className={is_phone_invalid ? "text-destructive" : ""}>
          Número Telefónico *
        </Label>
        <Input 
          id="phone" 
          type="tel" 
          placeholder="Ej. 4921954970" 
          value={phone_number} 
          onChange={handle_phone_change} 
          required 
          className={is_phone_invalid ? "border-destructive focus-visible:ring-destructive" : ""}
        />
        {/* Mensaje de ayuda que solo aparece si hay error en el número */}
        {is_phone_invalid && (
          <p className="text-xs text-destructive mt-1 font-medium">
            El número debe contener exactamente 10 dígitos.
          </p>
        )}
      </div>
    </div>
  );
};