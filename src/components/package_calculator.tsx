import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"; // Importamos Button
import { Calculator, DollarSign, X } from "lucide-react"; // Importamos el icono X

const session_prices: Record<string, number> = {
  "Sesión completa": 1700,
  "Sesión temática": 1200,
  "Sesión de gala": 1200,
  "Sesión familiar": 1500,
};

const frame_prices: Record<string, number> = {
  "Sin cuadro": 0,
  "CUADRO GRANDE F1": 2200,
  "CUADRO PEQUEÑO F2": 1400,
  "CUADRO GRANDE MDF": 1700,
  "CUADRO PEQUEÑO MDF": 1100,
  "CUADRO GRANDE MINIMALISTA": 1200,
  "CUADRO PEQUEÑO MINIMALISTA": 900,
};

// Definimos la interfaz para las props
interface PackageCalculatorProps {
  onClose?: () => void; // Prop opcional para manejar el cierre
}

// Actualizamos la definición del componente para aceptar props
export const PackageCalculator = ({ onClose }: PackageCalculatorProps) => {
  const [selected_session, set_selected_session] = useState<string>("Sesión completa");
  const [selected_frame, set_selected_frame] = useState<string>("Sin cuadro");
  const [needs_toga, set_needs_toga] = useState<boolean>(false);
  const [needs_estola, set_needs_estola] = useState<boolean>(false);
  const [needs_printed_photos, set_needs_printed_photos] = useState<boolean>(false);

  const session_cost = session_prices[selected_session] || 0;
  const frame_cost = frame_prices[selected_frame] || 0;
  const toga_cost = needs_toga ? 150 : 0;
  const estola_cost = needs_estola ? 450 : 0;
  const printed_photos_cost = needs_printed_photos ? 320 : 0;

  const total_cost = session_cost + frame_cost + toga_cost + estola_cost + printed_photos_cost;

  const format_currency = (amount: number) => 
    amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

  return (
    // Agregamos 'relative' a la Card para posicionar la 'X'
    <Card className="shadow-2xl border-2 border-primary/20 w-full max-w-md mx-auto bg-background rounded-xl overflow-hidden relative">
      
      {/* Botón de cerrar (X) - Solo se muestra si se proporciona la prop onClose */}
      {onClose && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-2 h-8 w-8 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground z-10"
          onClick={onClose}
          aria-label="Cerrar cotizador"
        >
          <X className="h-4 w-4" />
        </Button>
      )}

      <CardHeader className="bg-muted/30 border-b pb-4 text-center">
        <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Calculator className="h-5 w-5 text-primary" />
        </div>
        <CardTitle className="font-serif text-xl">Cotizador de Paquete</CardTitle>
        <CardDescription className="text-sm mt-1">
          Selecciona tus preferencias para calcular el costo total de tu paquete por persona.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label className="text-sm font-semibold">1. Elige tu tipo de sesión</Label>
          <Select value={selected_session} onValueChange={set_selected_session}>
            <SelectTrigger className="h-10 text-sm">
              <SelectValue placeholder="Selecciona el tipo de sesión" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(session_prices).map((session) => (
                <SelectItem key={session} value={session}>
                  {session} ({format_currency(session_prices[session])})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold">2. Elige tu estilo de cuadro</Label>
          <Select value={selected_frame} onValueChange={set_selected_frame}>
            <SelectTrigger className="h-10 text-sm">
              <SelectValue placeholder="Selecciona un cuadro (Opcional)" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(frame_prices).map((frame) => (
                <SelectItem key={frame} value={frame}>
                  {frame} {frame_prices[frame] > 0 ? `(+${format_currency(frame_prices[frame])})` : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 pt-1">
          <Label className="text-sm font-semibold">3. Complementos Adicionales</Label>
          <div className="flex flex-col gap-3 rounded-lg border p-3 bg-muted/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="toga" 
                  checked={needs_toga} 
                  onCheckedChange={(checked) => set_needs_toga(checked as boolean)} 
                  className="h-4 w-4"
                />
                <Label htmlFor="toga" className="cursor-pointer text-sm">Toga y Birrete</Label>
              </div>
              <span className="text-muted-foreground text-sm font-medium">+{format_currency(150)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="estola" 
                  checked={needs_estola} 
                  onCheckedChange={(checked) => set_needs_estola(checked as boolean)} 
                  className="h-4 w-4"
                />
                <Label htmlFor="estola" className="cursor-pointer text-sm">Estola Personalizada</Label>
              </div>
              <span className="text-muted-foreground text-sm font-medium">+{format_currency(450)}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="printed_photos" 
                  checked={needs_printed_photos} 
                  onCheckedChange={(checked) => set_needs_printed_photos(checked as boolean)} 
                  className="h-4 w-4"
                />
                <Label htmlFor="printed_photos" className="cursor-pointer text-sm">30 Fotos Impresas</Label>
              </div>
              <span className="text-muted-foreground text-sm font-medium">+{format_currency(320)}</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-primary/5 flex flex-col sm:flex-row items-center justify-between p-4 border-t mt-0 gap-3">
        <div className="text-center sm:text-left">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Costo Total Estimado</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Precio por persona (MXN)</p>
        </div>
        <div className="flex items-center gap-1 bg-background px-4 py-2 rounded-xl border-2 border-primary/20 shadow-sm">
          <DollarSign className="h-5 w-5 text-primary" />
          <span className="font-serif text-3xl font-bold text-foreground">
            {total_cost.toLocaleString('es-MX')}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};