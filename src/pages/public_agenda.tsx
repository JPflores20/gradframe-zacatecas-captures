import { useState } from "react";
import { parseISO, isSameDay, format, startOfDay } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { use_events_snapshot } from "@/functions/use_events_snapshot";
import { CONTACT_WHATSAPP_NUMBER } from "@/utils/constants";

const PublicAgenda = () => {
  const [selected_date, set_selected_date] = useState<Date | undefined>(new Date());
  
  const { events_list, is_loading_events } = use_events_snapshot();

  const booked_dates = events_list.map(event_item => parseISO(event_item.date));

  const is_date_booked = selected_date && booked_dates.some(booked => isSameDay(booked, selected_date));
  const is_future_date = selected_date && selected_date >= startOfDay(new Date());
  const is_available_for_booking = selected_date && is_future_date && !is_date_booked;

  let whatsapp_link = "";
  if (is_available_for_booking) {
    const formatted_date = format(selected_date, "EEEE d 'de' MMMM, yyyy", { locale: es });
    const message = `Hola, me gustaría solicitar informes para agendar una sesión fotográfica el día: ${formatted_date}.`;
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
          disabled={[...booked_dates, { before: new Date() }]}
          modifiersClassNames={{
            booked: "bg-zinc-700 dark:bg-zinc-600 text-zinc-50 font-bold rounded-md"
          }}
          locale={es}
        />

        <div className="mt-4 flex items-center justify-center gap-6 text-sm text-muted-foreground w-full p-4 bg-muted/20 border rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border border-primary/20" />
            <span>Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-zinc-700 dark:bg-zinc-600" />
            <span>Apartado / Evento</span>
          </div>
        </div>
      </div>

      {/* Availability announcement panel */}
      <div className="w-72 flex-shrink-0 flex items-center justify-center">
        {is_available_for_booking ? (
          <div className="w-full p-6 bg-primary/10 border border-primary/20 rounded-xl text-center animate-in fade-in slide-in-from-right-4">
            <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
              ¡Este día está disponible!
            </h3>
            <p className="text-sm text-muted-foreground mb-4 font-medium">{selected_date_label}</p>
            <p className="text-muted-foreground mb-6">
              ¿Te gustaría solicitar apartar esta fecha para tu sesión de graduación?
            </p>
            <Button asChild size="lg" className="gap-2 bg-green-600 hover:bg-green-700 text-white w-full font-medium">
              <a href={whatsapp_link} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                Solicitar Apartado por WhatsApp
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
