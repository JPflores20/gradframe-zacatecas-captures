import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Copy, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { GradframeEvent } from "@/types/gradframe_event";

interface EventListProps {
  is_loading: boolean;
  selected_events: GradframeEvent[];
}

export const AdminAgendaEventList = ({ is_loading, selected_events }: EventListProps) => {
  const copy_to_clipboard = (code_string: string) => {
    navigator.clipboard.writeText(code_string);
    toast.success("Código copiado al portapapeles", {
      description: code_string,
    });
  };

  if (is_loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (selected_events.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No hay eventos programados para esta fecha.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {selected_events.map((event_item) => (
        <div 
          key={event_item.id}
          className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg hover:bg-accent/50 transition-colors"
        >
          <div className="space-y-2 mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{event_item.title}</h3>
              <Badge variant="secondary" className="font-mono cursor-pointer" onClick={() => copy_to_clipboard(event_item.unique_code)}>
                {event_item.unique_code} <Copy className="w-3 h-3 ml-1 inline" />
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                {format(parseISO(event_item.date), "dd/MM/yyyy")}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {event_item.time}
              </div>
              {event_item.details && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span className="line-clamp-1 max-w-[200px]">{event_item.details}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <Button variant="outline" size="sm" onClick={() => copy_to_clipboard(event_item.unique_code)}>
              Copiar Código
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
