import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface PackageDetailsProps {
  photo_package: string;
  set_photo_package: (value: string) => void;
  frame_style: string;
  set_frame_style: (value: string) => void;
  needs_stole_and_cap: boolean;
  set_needs_stole_and_cap: (value: boolean) => void;
  needs_custom_stole: boolean;
  set_needs_custom_stole: (value: boolean) => void;
  custom_stole_text: string;
  set_custom_stole_text: (value: string) => void;
}

export const PackageDetailsSection = ({
  photo_package,
  set_photo_package,
  frame_style,
  set_frame_style,
  needs_stole_and_cap,
  set_needs_stole_and_cap,
  needs_custom_stole,
  set_needs_custom_stole,
  custom_stole_text,
  set_custom_stole_text
}: PackageDetailsProps) => {

  // Estados locales para dividir la información de la estola
  const [start_year, set_start_year] = useState("");
  const [end_year, set_end_year] = useState("");
  const [career, set_career] = useState("");

  // Generamos una lista de años (5 años hacia atrás y 5 hacia adelante)
  const current_year = new Date().getFullYear();
  const year_options = Array.from({ length: 11 }, (_, i) => (current_year - 5 + i).toString());

  // Este effect une los 3 campos en un solo texto cada vez que el usuario escribe
  // y lo guarda en el estado general del formulario (custom_stole_text)
  useEffect(() => {
    if (needs_custom_stole) {
      const formatted_text = `Generación ${start_year}-${end_year}, ${career}`.trim();
      set_custom_stole_text(formatted_text);
    }
  }, [start_year, end_year, career, needs_custom_stole, set_custom_stole_text]);

  let custom_stole_input: React.ReactNode = null;
  
  if (needs_custom_stole) {
    custom_stole_input = (
      <div className="space-y-4 pl-6 animate-in fade-in slide-in-from-top-2 border-l-2 border-primary/20 ml-2 mt-4 pt-2 pb-2">
        <h4 className="text-sm font-medium text-muted-foreground mb-3">Detalles de la Estola Personalizada</h4>
        
        {/* Lista de opciones de años para el autocompletado */}
        <datalist id="year-options">
          {year_options.map(year => <option key={year} value={year} />)}
        </datalist>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start_year" className="text-xs">Año de inicio *</Label>
            <Input 
              id="start_year" 
              type="number"
              list="year-options"
              placeholder="Ej. 2020" 
              value={start_year} 
              onChange={(event) => set_start_year(event.target.value)}
              required={needs_custom_stole}
              className="h-9 text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end_year" className="text-xs">Año de fin *</Label>
            <Input 
              id="end_year" 
              type="number"
              list="year-options"
              placeholder="Ej. 2024" 
              value={end_year} 
              onChange={(event) => set_end_year(event.target.value)}
              required={needs_custom_stole}
              className="h-9 text-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="career" className="text-xs">Carrera / Licenciatura *</Label>
          <Input 
            id="career" 
            placeholder="Ej. Ing. de Software" 
            value={career} 
            onChange={(event) => set_career(event.target.value)}
            required={needs_custom_stole}
            className="h-9 text-sm"
          />
        </div>
        
        {/* Vista previa para el usuario */}
        {(start_year || end_year || career) && (
          <p className="text-xs text-muted-foreground italic mt-2">
            Vista previa del bordado: <span className="font-semibold text-foreground">Generación {start_year}-{end_year}, {career}</span>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4 md:col-span-2 pt-4">
      <h3 className="font-semibold text-lg border-b pb-2">Paquete y Detalles Adicionales</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="package">Tipo de Sesión *</Label>
          <Select value={photo_package} onValueChange={set_photo_package}>
            <SelectTrigger id="package">
              <SelectValue placeholder="Selecciona el tipo de sesión" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sesión completa">Sesión completa</SelectItem>
              <SelectItem value="Sesión temática">Sesión temática</SelectItem>
              <SelectItem value="Sesión de gala">Sesión de gala</SelectItem>
              <SelectItem value="Sesión familiar">Sesión familiar</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="frame">Estilo de Cuadro *</Label>
          <Select value={frame_style} onValueChange={set_frame_style}>
            <SelectTrigger id="frame">
              <SelectValue placeholder="Selecciona el estilo de cuadro" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CUADRO GRANDE F1">CUADRO GRANDE F1</SelectItem>
              <SelectItem value="CUADRO PEQUEÑO F2">CUADRO PEQUEÑO F2</SelectItem>
              <SelectItem value="CUADRO GRANDE MDF">CUADRO GRANDE MDF</SelectItem>
              <SelectItem value="CUADRO PEQUEÑO MDF">CUADRO PEQUEÑO MDF</SelectItem>
              <SelectItem value="CUADRO GRANDE MINIMALISTA">CUADRO GRANDE MINIMALISTA</SelectItem>
              <SelectItem value="CUADRO PEQUEÑO MINIMALISTA">CUADRO PEQUEÑO MINIMALISTA</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4 p-4 border rounded-md bg-muted/10 mt-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="stoleAndCap" 
              checked={needs_stole_and_cap} 
              onCheckedChange={(checked) => set_needs_stole_and_cap(checked as boolean)} 
            />
            <Label htmlFor="stoleAndCap" className="font-medium cursor-pointer">
              Toga y Birrete
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="customStole" 
              checked={needs_custom_stole} 
              onCheckedChange={(checked) => set_needs_custom_stole(checked as boolean)} 
            />
            <Label htmlFor="customStole" className="font-medium cursor-pointer">
              Estola Personalizada
            </Label>
          </div>
        </div>
        {custom_stole_input}
      </div>
    </div>
  );
};