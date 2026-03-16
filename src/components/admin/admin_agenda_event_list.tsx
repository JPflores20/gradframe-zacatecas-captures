import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Copy, CalendarDays, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { GradframeEvent } from "@/types/gradframe_event";
import { fetch_registrations_by_event } from "@/functions/database";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface EventListProps {
  is_loading: boolean;
  selected_events: GradframeEvent[];
}

export const AdminAgendaEventList = ({ is_loading, selected_events }: EventListProps) => {
  const [downloading_event_id, set_downloading_event_id] = useState<string | null>(null);

  const copy_to_clipboard = (code_string: string) => {
    navigator.clipboard.writeText(code_string);
    toast.success("Código copiado al portapapeles", {
      description: code_string,
    });
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
      
      const tableRows = registrations.map(reg => {
        let total = 0;
        
        // 1. Sumar precio del paquete base
        if (reg.photo_package === "Sesión completa") total += 1700;
        else if (reg.photo_package === "Sesión temática") total += 1200;
        else if (reg.photo_package === "Sesión de gala") total += 1200;
        else if (reg.photo_package === "Sesión familiar") total += 1500;

        // 2. Sumar adicionales
        if (reg.stole_and_cap) total += 150;
        if (reg.custom_stole) total += 450;
        
        // 3. Sumar el estilo de cuadro exacto
        if (reg.frame_style === "CUADRO GRANDE F1") total += 2200;
        else if (reg.frame_style === "CUADRO PEQUEÑO F2") total += 1400;
        else if (reg.frame_style === "CUADRO GRANDE MDF") total += 1700;
        else if (reg.frame_style === "CUADRO PEQUEÑO MDF") total += 1100;
        else if (reg.frame_style === "CUADRO GRANDE MINIMALISTA") total += 1200;
        else if (reg.frame_style === "CUADRO PEQUEÑO MINIMALISTA") total += 900;

        // Calcular anticipo
        const anticipo = total / 2;

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
          <div className="space-y-2 mb-4 lg:mb-0">
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
          
          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
            <Button variant="outline" size="sm" onClick={() => copy_to_clipboard(event_item.unique_code)}>
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
        </div>
      ))}
    </div>
  );
};