import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { CalendarDays, ArrowLeft, DollarSign } from "lucide-react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { use_registration_logic } from "@/functions/use_registration_logic";
import { PersonalInfoSection } from '@/components/registration/personal_info_section';
import { OutfitDetailsSection } from '@/components/registration/outfit_details_section';
import { PackageDetailsSection } from '@/components/registration/package_details_section';

// Diccionarios de precios para el cálculo en tiempo real
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

const EventRegistrationForm = () => {
  const {
    target_event,
    is_loading_event,
    is_submitting,
    form_state,
    navigation_hook,
    handle_form_submit
  } = use_registration_logic();

  if (is_loading_event) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (target_event === null) {
    return null;
  }

  let submit_button_text = "Confirmar Registro";
  if (is_submitting) {
    submit_button_text = "Guardando Registro...";
  }

  // --- LÓGICA DE CÁLCULO EN TIEMPO REAL ---
  const session_cost = session_prices[form_state.photo_package] || 0;
  const frame_cost = frame_prices[form_state.frame_style] || 0;
  const toga_cost = form_state.needs_stole_and_cap ? 150 : 0;
  const estola_cost = form_state.needs_custom_stole ? 450 : 0;

  const total_cost = session_cost + frame_cost + toga_cost + estola_cost;
  const anticipo_cost = total_cost / 2;

  const format_currency = (amount: number) => 
    amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-20 max-w-3xl">
        <Button variant="ghost" className="mb-6 -ml-4 text-muted-foreground" onClick={() => navigation_hook("/ingresar-codigo")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Regresar a Código
        </Button>

        <Card className="shadow-lg border-2">
          <CardHeader className="bg-primary/5 border-b pb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="font-mono bg-background">{target_event.unique_code}</Badge>
            </div>
            <CardTitle className="text-2xl">{target_event.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 text-base mt-2">
              <CalendarDays className="w-4 h-4" />
              {format(parseISO(target_event.date), "EEEE d 'de' MMMM, yyyy", { locale: es })} a las {target_event.time}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8">
            <form onSubmit={handle_form_submit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PersonalInfoSection 
                  student_name={form_state.student_name}
                  set_student_name={form_state.set_student_name}
                  phone_number={form_state.phone_number}
                  set_phone_number={form_state.set_phone_number}
                />
                <OutfitDetailsSection 
                  student_height={form_state.student_height}
                  set_student_height={form_state.set_student_height}
                />
              </div>

              <PackageDetailsSection 
                photo_package={form_state.photo_package}
                set_photo_package={form_state.set_photo_package}
                frame_style={form_state.frame_style}
                set_frame_style={form_state.set_frame_style}
                needs_stole_and_cap={form_state.needs_stole_and_cap}
                set_needs_stole_and_cap={form_state.set_needs_stole_and_cap}
                needs_custom_stole={form_state.needs_custom_stole}
                set_needs_custom_stole={form_state.set_needs_custom_stole}
                custom_stole_text={form_state.custom_stole_text}
                set_custom_stole_text={form_state.set_custom_stole_text}
              />

              {/* CONTADOR DE PRECIO DINÁMICO */}
              {total_cost > 0 && (
                <div className="bg-primary/5 rounded-xl border-2 border-primary/20 p-5 mt-6 animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left w-full sm:w-auto">
                      <h4 className="font-serif text-xl text-foreground">Resumen de tu paquete</h4>
                      <div className="flex items-center justify-center sm:justify-start gap-2 mt-1.5">
                        <span className="text-sm text-muted-foreground">Costo Total:</span>
                        <span className="font-semibold text-base">{format_currency(total_cost)}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center sm:items-end w-full sm:w-auto bg-background px-5 py-3 rounded-xl border-2 border-primary/10 shadow-sm">
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Anticipo (50%)</p>
                      <div className="flex items-center gap-1 text-primary">
                        <DollarSign className="h-6 w-6" />
                        <span className="font-serif text-3xl font-bold text-foreground">
                          {anticipo_cost.toLocaleString('es-MX')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-6">
                <Button type="submit" className="w-full h-12 text-lg" disabled={is_submitting || total_cost === 0}>
                  {submit_button_text}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="justify-center text-sm text-muted-foreground border-t p-4 mt-6 text-center">
            Asegúrate de revisar todos tus datos antes de confirmar.
          </CardFooter>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventRegistrationForm;