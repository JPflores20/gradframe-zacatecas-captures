import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { create_new_event } from "@/functions/database";
import { generate_unique_code } from "@/functions/formatters";
import { ERROR_MISSING_FIELDS, ERROR_CREATING_EVENT, SUCCESS_EVENT_CREATED, REQUIRED_CODE_LENGTH } from "@/utils/constants";
import { EventSession } from "@/types/gradframe_event";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function EventCreationDialog({
  onEventCreated,
}: {
  onEventCreated?: () => void;
}) {
  const [is_dialog_open, set_is_dialog_open] = useState(false);
  const [event_title, set_event_title] = useState("");
  const [selected_date, set_selected_date] = useState<Date>();
  const [selected_start_time, set_selected_start_time] = useState("");
  const [selected_end_time, set_selected_end_time] = useState("");
  const [event_location, set_event_location] = useState("");
  const [event_deadline, set_event_deadline] = useState("");
  const [event_details, set_event_details] = useState("");
  const [sessions, set_sessions] = useState<EventSession[]>([]);
  const [is_loading, set_is_loading] = useState(false);

  const reset_form_fields = () => {
    set_event_title("");
    set_selected_date(undefined);
    set_selected_start_time("");
    set_selected_end_time("");
    set_event_location(""); 
    set_event_deadline("");
    set_event_details("");
    set_sessions([]);
  };

  const add_session = () => {
    set_sessions([...sessions, { id: crypto.randomUUID(), type: "Gala", date: "", startTime: "", endTime: "", location: "" }]);
  };

  const update_session = (id: string, field: keyof EventSession, value: string) => {
    set_sessions(sessions.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const remove_session = (id: string) => {
    set_sessions(sessions.filter(s => s.id !== id));
  };

  const handle_create_event_click = async () => {
    if (!event_title || !selected_date || !selected_start_time || !selected_end_time) {
      toast.error(ERROR_MISSING_FIELDS);
      return;
    }

    set_is_loading(true);
    
    const generated_code = generate_unique_code(REQUIRED_CODE_LENGTH);
    const date_string = format(selected_date, "yyyy-MM-dd");

    const event_creation_payload = {
      title: event_title,
      date: date_string,
      startTime: selected_start_time,
      endTime: selected_end_time,
      location: event_location, 
      deadline: event_deadline,
      details: event_details,
      unique_code: generated_code,
      photographer_id: "admin", 
      sessions: sessions,
    };

    const is_success = await create_new_event(event_creation_payload);

    if (is_success) {
      toast.success(SUCCESS_EVENT_CREATED, {
        description: `Código único: ${generated_code}`,
        duration: 8000,
      });

      set_is_dialog_open(false);
      reset_form_fields();
      
      if (onEventCreated) {
        onEventCreated();
      }
    } else {
      toast.error(ERROR_CREATING_EVENT);
    }
    
    set_is_loading(false);
  };

  let submit_button_text = "Crear Evento y Generar Código";
  if (is_loading) {
    submit_button_text = "Creando...";
  }

  let date_button_text: React.ReactNode = <span>Elegir fecha</span>;
  if (selected_date) {
    date_button_text = format(selected_date, "PPP", { locale: es });
  }

  let date_button_classes = "w-full justify-start text-left font-normal";
  if (!selected_date) {
    date_button_classes += " text-muted-foreground";
  }

  return (
    <Dialog open={is_dialog_open} onOpenChange={set_is_dialog_open}>
      <DialogTrigger asChild>
        <Button>Agregar Nuevo Evento</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Evento</DialogTitle>
          <DialogDescription>
            Agrega los detalles del evento en tu agenda. Se generará un código
            único automáticamente.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Título *</Label>
            <Input
              id="title"
              value={event_title}
              onChange={(event) => set_event_title(event.target.value)}
              className="col-span-3"
              placeholder="e.g., Graduación UAZ Música"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">Fecha *</Label>
            <div className="col-span-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"} className={date_button_classes}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date_button_text}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selected_date}
                    onSelect={set_selected_date}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Horario *</Label>
            <div className="col-span-3 flex gap-2">
              <div className="flex-1">
                <Label htmlFor="start_time" className="text-[10px] sm:text-xs mb-1 block text-muted-foreground">Inicio</Label>
                <Input
                  id="start_time"
                  type="time"
                  value={selected_start_time}
                  onChange={(event) => set_selected_start_time(event.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="end_time" className="text-[10px] sm:text-xs mb-1 block text-muted-foreground">Termina</Label>
                <Input
                  id="end_time"
                  type="time"
                  value={selected_end_time}
                  onChange={(event) => set_selected_end_time(event.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">Ubicación</Label>
            <Input
              id="location"
              value={event_location}
              onChange={(event) => set_event_location(event.target.value)}
              className="col-span-3"
              placeholder="e.g., Centro Platero, Estudio, etc."
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="deadline" className="text-right text-xs leading-tight">Límite de Registro</Label>
            <Input
              id="deadline"
              type="date"
              value={event_deadline}
              onChange={(event) => set_event_deadline(event.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="details" className="text-right">Detalles</Label>
            <Textarea
              id="details"
              value={event_details}
              onChange={(event) => set_event_details(event.target.value)}
              className="col-span-3"
              placeholder="Información adicional (opcional)"
            />
          </div>

          <div className="border-t pt-4 mt-2">
            <div className="flex items-center justify-between mb-3">
              <div>
                <Label className="font-semibold text-sm block">Sesiones Adicionales</Label>
                <span className="text-[10px] text-muted-foreground leading-tight">Agrega fechas específicas para tipos de sesión (Gala, Familiar, etc.)</span>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={add_session}>
                <Plus className="h-4 w-4 mr-1" />
                Añadir
              </Button>
            </div>
            
            <div className="space-y-3">
              {sessions.map((session, index) => (
                <div key={session.id} className="relative bg-muted/30 p-3 rounded-lg border border-border/50 grid gap-3">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-background border shadow-sm text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900 z-10" 
                    onClick={() => remove_session(session.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2 sm:col-span-1">
                      <Label className="text-[11px] mb-1 block text-muted-foreground">Tipo</Label>
                      <Select value={session.type} onValueChange={(val) => update_session(session.id, "type", val)}>
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Gala">Gala</SelectItem>
                          <SelectItem value="Temática">Temática</SelectItem>
                          <SelectItem value="Familiar">Familiar</SelectItem>
                          <SelectItem value="Individual">Individual</SelectItem>
                          <SelectItem value="Múltiple">Múltiple</SelectItem>
                          <SelectItem value="General">General</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="col-span-2 sm:col-span-1">
                      <Label className="text-[11px] mb-1 block text-muted-foreground">Ubicación</Label>
                      <Input 
                        className="h-8 text-xs" 
                        placeholder="Ej. Centro Platero" 
                        value={session.location || ""} 
                        onChange={(e) => update_session(session.id, "location", e.target.value)} 
                      />
                    </div>
                    
                    <div className="col-span-1">
                      <Label className="text-[11px] mb-1 block text-muted-foreground">Fecha</Label>
                      <Input 
                        type="date" 
                        className="h-8 text-xs" 
                        value={session.date} 
                        onChange={(e) => update_session(session.id, "date", e.target.value)} 
                      />
                    </div>
                    
                    <div className="col-span-1 flex gap-2">
                      <div className="w-1/2">
                        <Label className="text-[11px] mb-1 block text-muted-foreground">Inicio</Label>
                        <Input 
                          type="time" 
                          className="h-8 text-xs px-1" 
                          value={session.startTime} 
                          onChange={(e) => update_session(session.id, "startTime", e.target.value)} 
                        />
                      </div>
                      <div className="w-1/2">
                        <Label className="text-[11px] mb-1 block text-muted-foreground">Fin</Label>
                        <Input 
                          type="time" 
                          className="h-8 text-xs px-1" 
                          value={session.endTime} 
                          onChange={(e) => update_session(session.id, "endTime", e.target.value)} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handle_create_event_click} disabled={is_loading}>
            {submit_button_text}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}