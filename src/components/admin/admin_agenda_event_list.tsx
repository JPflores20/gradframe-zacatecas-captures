import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Copy, CalendarDays, Download, Loader2, Pencil, Trash2, X, Check, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { GradframeEvent } from "@/types/gradframe_event";
import { fetch_registrations_by_event, delete_admin_event, update_admin_event } from "@/functions/database";
import { Input } from "@/components/ui/input";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface EventListProps {
  is_loading: boolean;
  selected_events: GradframeEvent[];
}

export const AdminAgendaEventList = ({ is_loading, selected_events }: EventListProps) => {
  const [downloading_event_id, set_downloading_event_id] = useState<string | null>(null);
  const [editing_event_id, set_editing_event_id] = useState<string | null>(null);
  const [edit_form_data, set_edit_form_data] = useState<Partial<GradframeEvent>>({});
  
  const [event_to_delete, set_event_to_delete] = useState<string | null>(null);

  const copy_to_clipboard = (code_string: string) => {
    navigator.clipboard.writeText(code_string);
    toast.success("Código copiado al portapapeles", {
      description: code_string,
    });
  };

  const handle_delete_click = (id: string | undefined) => {
    if (!id) return;
    set_event_to_delete(id);
  };

  const confirm_delete_event = async () => {
    if (!event_to_delete) return;
    
    const success = await delete_admin_event(event_to_delete);
    if (success) {
      toast.success("Evento eliminado correctamente");
    } else {
      toast.error("Hubo un error al eliminar el evento");
    }
    set_event_to_delete(null); 
  };

  const start_editing = (event: GradframeEvent) => {
    set_editing_event_id(event.id || null);
    set_edit_form_data({ ...event });
  };

  const cancel_editing = () => {
    set_editing_event_id(null);
    set_edit_form_data({});
  };

  const handle_edit_change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    set_edit_form_data(prev => ({ ...prev, [name]: value }));
  };

  const save_edit = async () => {
    if (!editing_event_id) return;
    
    if (!edit_form_data.title || !edit_form_data.date || !edit_form_data.time) {
      toast.error("El título, la fecha y la hora son obligatorios.");
      return;
    }

    const success = await update_admin_event(editing_event_id, edit_form_data);
    if (success) {
      toast.success("Evento actualizado correctamente");
      set_editing_event_id(null);
    } else {
      toast.error("Hubo un error al actualizar el evento");
    }
  };

  const download_event_pdf = async (event: GradframeEvent) => {
    if (!event.id) return;
    
    set_downloading_event_id(event.id);
    toast.info("Generando PDF...");

    try {
      const registrations = await fetch_registrations_by_event(event.id);

      if (registrations.length === 0) {
        toast.warning("No hay registros para este evento aún.");
        set_downloading_event_id(null);
        return;
      }

      const doc = new jsPDF({ orientation: 'landscape' });
      
      doc.setFontSize(18);
      doc.text(`Reporte de Registros: ${event.title}`, 14, 22);
      
      doc.setFontSize(11);
      doc.setTextColor(100);
      const event_date = format(parseISO(event.date), "dd/MM/yyyy");
      doc.text(`Fecha: ${event_date} | Hora: ${event.time} | Código: ${event.unique_code}`, 14, 30);
      doc.text(`Total de registrados: ${registrations.length}`, 14, 38);

      const format_currency = (amount: number) => 
        amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

      const tableColumn = [
        "Nombre", "Teléfono", "Estatura", "Paquete", "Cuadro", 
        "Toga/Birrete", "Estola", "Costo Total", "Anticipo (50%)"
      ];
      
      let gran_total = 0;
      let gran_anticipo = 0;
      
      const tableRows = registrations.map(reg => {
        let total = 0;
        
        if (reg.photo_package === "Sesión completa") total += 1700;
        else if (reg.photo_package === "Sesión temática") total += 1200;
        else if (reg.photo_package === "Sesión de gala") total += 1200;
        else if (reg.photo_package === "Sesión familiar") total += 1500;

        if (reg.stole_and_cap) total += 150;
        if (reg.custom_stole) total += 450;
        
        if (reg.frame_style === "CUADRO GRANDE F1") total += 2200;
        else if (reg.frame_style === "CUADRO PEQUEÑO F2") total += 1400;
        else if (reg.frame_style === "CUADRO GRANDE MDF") total += 1700;
        else if (reg.frame_style === "CUADRO PEQUEÑO MDF") total += 1100;
        else if (reg.frame_style === "CUADRO GRANDE MINIMALISTA") total += 1200;
        else if (reg.frame_style === "CUADRO PEQUEÑO MINIMALISTA") total += 900;

        const anticipo = total / 2;

        gran_total += total;
        gran_anticipo += anticipo;

        return [
          reg.name,
          reg.phone_number,
          reg.height,
          reg.photo_package,
          reg.frame_style,
          reg.stole_and_cap ? "Sí" : "No",
          reg.custom_stole || "No",
          format_currency(total),
          format_currency(anticipo)
        ];
      });

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        foot: [[
          { content: 'TOTALES:', colSpan: 7, styles: { halign: 'right', fillColor: [220, 38, 38], textColor: 255, fontStyle: 'bold' } },
          { content: format_currency(gran_total), styles: { fillColor: [220, 38, 38], textColor: 255, fontStyle: 'bold' } },
          { content: format_currency(gran_anticipo), styles: { fillColor: [220, 38, 38], textColor: 255, fontStyle: 'bold' } }
        ]],
        startY: 45,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185] }, 
        styles: { fontSize: 8, cellPadding: 3 },
      });

      const file_name = `Registros_${event.unique_code}_${event_date.replace(/\//g, '-')}.pdf`;
      doc.save(file_name);
      toast.success("PDF descargado correctamente");

    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Hubo un error al generar el PDF");
    } finally {
      set_downloading_event_id(null);
    }
  };

  // Función para generar el enlace a Google Calendar
  const get_google_calendar_url = (event_item: GradframeEvent) => {
    try {
      // Extraemos año, mes, día, hora y minutos
      const [year, month, day] = event_item.date.split("-");
      const [hour, minute] = event_item.time.split(":");
      
      // Creamos el objeto Date (mes es base 0 en JS)
      const start_date = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
      // Asumimos 2 horas de duración para el evento fotográfico
      const end_date = new Date(start_date.getTime() + 2 * 60 * 60 * 1000); 
      
      // Formato requerido por Google (YYYYMMDDTHHmmssZ)
      const format_date_gcal = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");
      
      const text = encodeURIComponent(event_item.title);
      const dates = `${format_date_gcal(start_date)}/${format_date_gcal(end_date)}`;
      const details = encodeURIComponent(`Código del evento: ${event_item.unique_code}\n\nDetalles: ${event_item.details || "Sin detalles extra"}`);
      const location = encodeURIComponent(event_item.location || event_item.details || "Zacatecas");
      
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
    } catch (e) {
      return "#";
    }
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
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-4 border rounded-lg hover:bg-accent/50 transition-colors"
        >
          {editing_event_id === event_item.id ? (
            <div className="w-full space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Título del evento</label>
                  <Input 
                    name="title" 
                    value={edit_form_data.title || ""} 
                    onChange={handle_edit_change} 
                    className="mt-1 h-8"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Ubicación</label>
                  <Input 
                    name="location" 
                    value={edit_form_data.location || ""} 
                    onChange={handle_edit_change} 
                    className="mt-1 h-8"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Fecha</label>
                  <Input 
                    type="date" 
                    name="date" 
                    value={edit_form_data.date || ""} 
                    onChange={handle_edit_change} 
                    className="mt-1 h-8"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Hora</label>
                  <Input 
                    type="time" 
                    name="time" 
                    value={edit_form_data.time || ""} 
                    onChange={handle_edit_change} 
                    className="mt-1 h-8"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Fecha Límite</label>
                  <Input 
                    type="date" 
                    name="deadline" 
                    value={edit_form_data.deadline || ""} 
                    onChange={handle_edit_change} 
                    className="mt-1 h-8"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Detalles</label>
                  <Input 
                    name="details" 
                    value={edit_form_data.details || ""} 
                    onChange={handle_edit_change} 
                    className="mt-1 h-8"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <Button variant="outline" size="sm" onClick={cancel_editing}>
                  <X className="w-4 h-4 mr-1" /> Cancelar
                </Button>
                <Button size="sm" onClick={save_edit}>
                  <Check className="w-4 h-4 mr-1" /> Guardar
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-2 mb-4 lg:mb-0 w-full lg:w-auto">
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
                  {event_item.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1 max-w-[200px]">{event_item.location}</span>
                    </div>
                  )}
                  {event_item.deadline && (
                    <div className="flex items-center gap-1 text-red-500 font-medium">
                      <Clock className="w-4 h-4" />
                      Límite: {format(parseISO(event_item.deadline), "dd/MM/yyyy")}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full lg:w-auto mt-2 lg:mt-0">
                {/* --- NUEVO BOTÓN DE GOOGLE CALENDAR --- */}
                <Button variant="outline" size="icon" asChild title="Añadir a Google Calendar">
                  <a href={get_google_calendar_url(event_item)} target="_blank" rel="noopener noreferrer">
                    <CalendarPlus className="w-4 h-4 text-blue-500" />
                  </a>
                </Button>
                
                <Button variant="outline" size="icon" onClick={() => start_editing(event_item)} title="Editar evento">
                  <Pencil className="w-4 h-4 text-blue-600" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handle_delete_click(event_item.id)} title="Eliminar evento">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => copy_to_clipboard(event_item.unique_code)}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Código 
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => download_event_pdf(event_item)}
                  disabled={downloading_event_id === event_item.id}
                >
                  {downloading_event_id === event_item.id ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4 mr-2" />
                  )}
                  Descargar PDF
                </Button>
              </div>
            </>
          )}
        </div>
      ))}
      
      <AlertDialog open={!!event_to_delete} onOpenChange={(open) => !open && set_event_to_delete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente el evento y los graduados ya no podrán registrarse usando el código.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => set_event_to_delete(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirm_delete_event} 
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Eliminar Evento
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
};