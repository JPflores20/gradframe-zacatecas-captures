import { useState, useEffect } from "react";
import { parseISO, isSameDay, format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { EventCreationDialog } from '@/components/admin/event_creation_dialog';
import { CalendarDays, LogOut } from "lucide-react";
import { toast } from "sonner";
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { use_events_snapshot } from "@/functions/use_events_snapshot";
import { check_is_admin_authenticated, logout_admin } from "@/functions/auth";
import { SUCCESS_LOGOUT } from "@/utils/constants";
import { AdminAgendaEventList } from '@/components/admin/admin_agenda_event_list';

const AdminAgenda = () => {
  const [selected_date, set_selected_date] = useState<Date | undefined>(new Date());
  const navigation_hook = useNavigate();
  
  const { events_list, is_loading_events } = use_events_snapshot();

  useEffect(() => {
    const is_authenticated = check_is_admin_authenticated();
    if (!is_authenticated) {
      navigation_hook("/admin/login");
    }
  }, [navigation_hook]);

  const filtered_selected_events = events_list.filter(event_item => {
    if (!selected_date) {
      return true;
    }
    const parsed_event_date = parseISO(event_item.date);
    return isSameDay(parsed_event_date, selected_date);
  });

  const all_booked_dates = events_list.map(event_item => parseISO(event_item.date));

  const handle_logout_click = () => {
    logout_admin();
    toast.success(SUCCESS_LOGOUT);
    navigation_hook("/admin/login");
  };

  let formatted_date_string = "Todos los días";
  if (selected_date) {
    formatted_date_string = format(selected_date, "d 'de' MMMM, yyyy", { locale: es });
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold tracking-tight">Agenda del Fotógrafo</h1>
              <Button variant="outline" size="sm" onClick={handle_logout_click} className="text-muted-foreground">
                <LogOut className="w-4 h-4 mr-2" /> Salir
              </Button>
            </div>
            <p className="text-muted-foreground mt-1">
              Administra tus eventos fotográficos y genera códigos de acceso.
            </p>
          </div>
          <EventCreationDialog />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Calendario</CardTitle>
                <CardDescription>Eventos programados</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selected_date}
                  onSelect={set_selected_date}
                  className="rounded-md border mx-auto"
                  modifiers={{ booked: all_booked_dates }}
                  modifiersStyles={{
                    booked: { fontWeight: 'bold', textDecoration: 'underline' }
                  }}
                  locale={es}
                />
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span>Día seleccionado</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-8 lg:col-span-9">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  Eventos para el {formatted_date_string}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AdminAgendaEventList 
                  is_loading={is_loading_events} 
                  selected_events={filtered_selected_events} 
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminAgenda;
