import { useState } from "react";
import { parseISO, isSameDay, format, startOfDay } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Clock } from "lucide-react";
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { use_events_snapshot } from "@/functions/use_events_snapshot";
import { CONTACT_WHATSAPP_NUMBER } from "@/utils/constants";

const PublicAgenda = () => {
  const [selected_date, set_selected_date] = useState<Date | undefined>(new Date());
  
  const { events_list, is_loading_events } = use_events_snapshot();

  // Create an array of ALL dates that have either a main event or a session
  const booked_dates = events_list.flatMap(event => {
    const dates = [parseISO(event.date)];
    if (event.sessions) {
      event.sessions.forEach(s => {
        if (s.date) dates.push(parseISO(s.date));
      });
    }
    return dates;
  });

  const is_future_date = selected_date && selected_date >= startOfDay(new Date());
  const is_available_for_booking = selected_date && is_future_date;

  // Find all occupied times on the selected date
  const events_on_selected_date = selected_date 
    ? events_list.filter(event => isSameDay(parseISO(event.date), selected_date)) 
    : [];

  const sessions_on_selected_date = selected_date 
    ? events_list.flatMap(event => event.sessions || []).filter(session => session.date && isSameDay(parseISO(session.date), selected_date))
    : [];

  const occupied_times = [
    ...events_on_selected_date.map(e => ({ start: e.startTime, end: e.endTime, type: "Evento" })),
    ...sessions_on_selected_date.map(s => ({ start: s.startTime, end: s.endTime, type: s.type }))
  ].filter(t => t.start && t.end).sort((a, b) => a.start.localeCompare(b.start));

  let whatsapp_link = "";
  if (is_available_for_booking) {
    const formatted_date = format(selected_date, "EEEE d 'de' MMMM, yyyy", { locale: es });
    let message = `Hola, me gustaría solicitar informes para agendar una sesión fotográfica el día: ${formatted_date}.`;
    if (occupied_times.length > 0) {
      message += ` He visto que tienen algunos horarios ocupados, quisiera saber qué horarios libres tienen.`;
    }
    whatsapp_link = `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  const selected_date_label = selected_date ? format(selected_date, "dd/MM/yyyy") : "";

  let calendar_content = (
    <div className="flex flex-col md:flex-row gap-8 w-full items-center justify-center">
      {/* Calendar + legend */}
      <div className="flex flex-col items-center flex-shrink-0">
        <Calendar
          mode="single"
          selected={selected_date}
          onSelect={set_selected_date}
          className="rounded-md mx-auto"
          classNames={{
            head_cell: "text-muted-foreground rounded-md w-11 font-normal text-[0.8rem]",
            cell: "h-11 w-11 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
            day: "h-11 w-11 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md inline-flex items-center justify-center",
          }}
          modifiers={{ booked: booked_dates }}
          disabled={[{ before: new Date() }]}
          modifiersClassNames={{
            booked: "font-semibold relative after:absolute after:bottom-[5px] after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-primary after:rounded-full"
          }}
          locale={es}
        />

        <div className="mt-4 flex items-center justify-center gap-6 text-sm text-muted-foreground w-full p-4 bg-muted/20 border rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border border-primary/20" />
            <span>Día Libre</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>Con Horarios Ocupados</span>
          </div>
        </div>
      </div>

      {/* Availability announcement panel */}
      <div className="w-72 flex-shrink-0 flex items-center justify-center">
        {is_available_for_booking ? (
          <div className="w-full p-6 bg-primary/5 border border-primary/20 rounded-xl text-center animate-in fade-in slide-in-from-right-4">
            
            {occupied_times.length > 0 ? (
              <>
                <h3 className="font-serif text-[1.1rem] leading-tight font-semibold text-foreground mb-2">
                  Disponibilidad Parcial
                </h3>
                <p className="text-sm text-muted-foreground mb-4 font-medium">{selected_date_label}</p>
                <div className="mb-4 text-left bg-background/80 rounded-lg p-3 text-sm border shadow-sm">
                  <p className="font-semibold text-[11px] mb-2 text-muted-foreground uppercase tracking-wider text-center">Horarios Ocupados</p>
                  <ul className="space-y-2 list-none">
                    {occupied_times.map((t, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-foreground font-medium bg-muted/50 px-2.5 py-1.5 rounded-md text-[11px] border border-border/50">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        {t.start} - {t.end} 
                        <span className="text-muted-foreground ml-auto bg-background px-1.5 py-0.5 rounded text-[10px]">{t.type}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs text-muted-foreground mb-5">
                  Aún puedes solicitar informes para algún horario libre que quede en este día.
                </p>
              </>
            ) : (
              <>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
                  ¡Día completamente libre!
                </h3>
                <p className="text-sm text-muted-foreground mb-4 font-medium">{selected_date_label}</p>
                <p className="text-muted-foreground text-sm mb-6">
                  Toda la agenda está disponible. ¿Te gustaría solicitar informes para apartarlo?
                </p>
              </>
            )}

            <Button asChild size="lg" className="gap-2 bg-green-600 hover:bg-green-700 text-white w-full font-medium h-12">
              <a href={whatsapp_link} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                Contactar por WhatsApp
              </a>
            </Button>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm text-center">
            Selecciona un día disponible para ver opciones de contacto.
          </p>
        )}
      </div>
    </div>
  );

  if (is_loading_events) {
    calendar_content = (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-20 md:mt-24">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">Agenda Fotográfica</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Consulta nuestra disponibilidad de fechas. Los días sombreados representan fechas en las que ya tenemos ocupación o eventos registrados.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-2 border-muted overflow-hidden">
            <CardHeader className="bg-muted/30 pb-6 border-b">
              <CardTitle className="text-center">Disponibilidad</CardTitle>
              <CardDescription className="text-center">Selecciona un día para ver si está disponible</CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              {calendar_content}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PublicAgenda;
