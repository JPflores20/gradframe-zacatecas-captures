import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Calculator, DollarSign } from "lucide-react";

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

export const PackageCalculator = () => {
  const [selected_session, set_selected_session] = useState<string>("Sesión completa");
  const [selected_frame, set_selected_frame] = useState<string>("Sin cuadro");
  const [needs_toga, set_needs_toga] = useState<boolean>(false);
  const [needs_estola, set_needs_estola] = useState<boolean>(false);

  const session_cost = session_prices[selected_session] || 0;
  const frame_cost = frame_prices[selected_frame] || 0;
  const toga_cost = needs_toga ? 150 : 0;
  const estola_cost = needs_estola ? 450 : 0;

  const total_cost = session_cost + frame_cost + toga_cost + estola_cost;

  const format_currency = (amount: number) => 
    amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

  return (
    <Card className="shadow-2xl border-2 border-primary/20 w-full max-w-xl mx-auto bg-background rounded-xl overflow-hidden">
      <CardHeader className="bg-muted/30 border-b pb-6 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Calculator className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="font-serif text-2xl">Cotizador de Paquete</CardTitle>
        <CardDescription className="text-base mt-2">
          Selecciona tus preferencias para calcular el costo total de tu paquete por persona.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        <div className="space-y-3">
          <Label className="text-base font-semibold">1. Elige tu tipo de sesión</Label>
          <Select value={selected_session} onValueChange={set_selected_session}>
            <SelectTrigger className="h-12 text-md">
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

        <div className="space-y-3">
          <Label className="text-base font-semibold">2. Elige tu estilo de cuadro</Label>
          <Select value={selected_frame} onValueChange={set_selected_frame}>
            <SelectTrigger className="h-12 text-md">
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

        <div className="space-y-4 pt-2">
          <Label className="text-base font-semibold">3. Complementos Adicionales</Label>
          <div className="flex flex-col gap-4 rounded-lg border p-4 bg-muted/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="toga" 
                  checked={needs_toga} 
                  onCheckedChange={(checked) => set_needs_toga(checked as boolean)} 
                  className="h-5 w-5"
                />
                <Label htmlFor="toga" className="cursor-pointer text-base">Toga y Birrete</Label>
              </div>
              <span className="text-muted-foreground font-medium">+{format_currency(150)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="estola" 
                  checked={needs_estola} 
                  onCheckedChange={(checked) => set_needs_estola(checked as boolean)} 
                  className="h-5 w-5"
                />
                <Label htmlFor="estola" className="cursor-pointer text-base">Estola Personalizada</Label>
              </div>
              <span className="text-muted-foreground font-medium">+{format_currency(450)}</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-primary/5 flex flex-col sm:flex-row items-center justify-between p-6 border-t mt-2 gap-4">
        <div className="text-center sm:text-left">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Costo Total Estimado</p>
          <p className="text-xs text-muted-foreground mt-1">Precio por persona (MXN)</p>
        </div>
        <div className="flex items-center gap-1 bg-background px-6 py-3 rounded-xl border-2 border-primary/20 shadow-sm">
          <DollarSign className="h-6 w-6 text-primary" />
          <span className="font-serif text-4xl font-bold text-foreground">
            {total_cost.toLocaleString('es-MX')}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};