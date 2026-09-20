import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Pencil, Trash2, Check, X, Search, DollarSign } from "lucide-react";
import { GradframeRegistration } from "@/types/gradframe_registration";
import { fetch_registrations_by_event, update_registration_admin, delete_registration_admin } from "@/functions/database";
import { SESSION_PRICES, FRAME_PRICES, PRICE_TOGA_BIRRETE, PRICE_ESTOLA_PERSONALIZADA, FOTOS_TITULO_PRICES, PRICE_FOTOS_IMPRESAS, PHOTO_PACKAGE_OPTIONS, FRAME_STYLE_OPTIONS, FOTOS_TITULO_OPTIONS } from "@/utils/constants";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface AdminRegistrationsDialogProps {
  event_id: string;
  event_title: string;
}

export const AdminRegistrationsDialog = ({ event_id, event_title }: AdminRegistrationsDialogProps) => {
  const [registrations, set_registrations] = useState<GradframeRegistration[]>([]);
  const [is_loading, set_is_loading] = useState(false);
  const [search_query, set_search_query] = useState("");
  const [editing_id, set_editing_id] = useState<string | null>(null);
  const [edit_form, set_edit_form] = useState<Partial<GradframeRegistration>>({});

  const load_registrations = async () => {
    set_is_loading(true);
    try {
      const data = await fetch_registrations_by_event(event_id);
      set_registrations(data);
    } catch (error) {
      console.error("Error loading registrations:", error);
      toast.error("Error al cargar los registros");
    } finally {
      set_is_loading(false);
    }
  };

  const handle_open_change = (open: boolean) => {
    if (open) {
      load_registrations();
    } else {
      set_editing_id(null);
    }
  };

  const calculate_totals = (reg: Partial<GradframeRegistration>) => {
    let calculated_total = 0;
    if (reg.photo_package) calculated_total += SESSION_PRICES[reg.photo_package] || 0;
    if (reg.frame_style) calculated_total += FRAME_PRICES[reg.frame_style] || 0;
    if (reg.stole_and_cap) calculated_total += PRICE_TOGA_BIRRETE;
    if (reg.custom_stole && reg.custom_stole !== "No requerida") calculated_total += PRICE_ESTOLA_PERSONALIZADA;
    
    if (typeof reg.fotos_titulo === "string") {
      calculated_total += FOTOS_TITULO_PRICES[reg.fotos_titulo] || 0;
    } else if (reg.fotos_titulo === true) {
      calculated_total += 350; // Backward compatibility
    }
    
    if (reg.printed_photos) calculated_total += PRICE_FOTOS_IMPRESAS;

    const total = reg.total_cost !== undefined ? reg.total_cost : calculated_total;
    const anticipo = reg.anticipo !== undefined ? reg.anticipo : total / 2;
    const restante = total - anticipo;

    return { total, anticipo, restante };
  };

  const handle_edit_click = (reg: GradframeRegistration) => {
    set_editing_id(reg.id || null);
    set_edit_form({ ...reg });
  };

  const handle_save = async () => {
    if (!editing_id) return;
    
    const { total } = calculate_totals(edit_form);
    const final_form = { ...edit_form, total_cost: total };
    
    const success = await update_registration_admin(editing_id, final_form);
    if (success) {
      toast.success("Registro actualizado");
      set_editing_id(null);
      load_registrations();
    } else {
      toast.error("Error al actualizar el registro");
    }
  };

  const handle_delete = async (id: string) => {
    if (!window.confirm("¿Estás seguro de eliminar este registro?")) return;
    
    const success = await delete_registration_admin(id);
    if (success) {
      toast.success("Registro eliminado");
      load_registrations();
    } else {
      toast.error("Error al eliminar el registro");
    }
  };

  const filtered_registrations = registrations.filter(reg => 
    reg.name.toLowerCase().includes(search_query.toLowerCase()) ||
    reg.phone_number.includes(search_query)
  );

  const format_currency = (amount: number) => 
    amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

  return (
    <Dialog onOpenChange={handle_open_change}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          Ver Registrados
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">Registros - {event_title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          <div className="flex items-center gap-2 relative">
            <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
            <Input 
              placeholder="Buscar por nombre o teléfono..." 
              className="pl-9 h-10"
              value={search_query}
              onChange={(e) => set_search_query(e.target.value)}
            />
          </div>

          <div className="rounded-md border shadow-sm">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[180px]">Nombre</TableHead>
                  <TableHead>Paquete/Cuadro</TableHead>
                  <TableHead>Extras</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Anticipo</TableHead>
                  <TableHead>Restante</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {is_loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10">
                      <div className="flex justify-center flex-col items-center gap-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <span className="text-sm text-muted-foreground">Cargando registros...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filtered_registrations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                      No se encontraron registros para este evento.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered_registrations.map((reg) => {
                    const is_editing = editing_id === reg.id;
                    const { total, anticipo, restante } = calculate_totals(is_editing ? edit_form : reg);

                    return (
                      <TableRow key={reg.id} className={is_editing ? "bg-primary/5" : ""}>
                        <TableCell className="font-medium">
                          {is_editing ? (
                            <div className="space-y-2">
                              <Input 
                                value={edit_form.name || ""} 
                                onChange={(e) => set_edit_form({...edit_form, name: e.target.value})}
                                className="h-8 text-sm"
                                placeholder="Nombre"
                              />
                              <Input 
                                value={edit_form.phone_number || ""} 
                                onChange={(e) => set_edit_form({...edit_form, phone_number: e.target.value})}
                                className="h-8 text-sm"
                                placeholder="Teléfono"
                              />
                            </div>
                          ) : (
                            <div className="flex flex-col">
                              <span>{reg.name}</span>
                              <span className="text-xs text-muted-foreground">{reg.phone_number}</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {is_editing ? (
                            <div className="space-y-2">
                              <Select 
                                value={edit_form.photo_package} 
                                onValueChange={(val) => set_edit_form({...edit_form, photo_package: val})}
                              >
                                <SelectTrigger className="h-8 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {PHOTO_PACKAGE_OPTIONS.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                                </SelectContent>
                              </Select>
                              <Select 
                                value={edit_form.frame_style} 
                                onValueChange={(val) => set_edit_form({...edit_form, frame_style: val})}
                              >
                                <SelectTrigger className="h-8 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {FRAME_STYLE_OPTIONS.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                                </SelectContent>
                              </Select>
                            </div>
                          ) : (
                            <div className="flex flex-col gap-1">
                              <Badge variant="outline" className="text-[10px] w-fit">{reg.photo_package}</Badge>
                              <span className="text-xs truncate max-w-[120px]">{reg.frame_style}</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {is_editing ? (
                            <div className="space-y-2 py-1">
                              <div className="flex items-center gap-2">
                                <Checkbox 
                                  id={`stole-${reg.id}`}
                                  checked={!!edit_form.stole_and_cap}
                                  onCheckedChange={(val) => set_edit_form({...edit_form, stole_and_cap: !!val})}
                                />
                                <Label htmlFor={`stole-${reg.id}`} className="text-xs font-normal">Toga/Birrete</Label>
                              </div>
                              <div className="flex flex-col gap-1 w-full mt-1">
                                <div className="flex items-center gap-2">
                                  <Checkbox 
                                    id={`custom-${reg.id}`}
                                    checked={!!edit_form.custom_stole && edit_form.custom_stole !== "No requerida"}
                                    onCheckedChange={(val) => set_edit_form({...edit_form, custom_stole: val ? edit_form.custom_stole || "Personalizada" : "No requerida"})}
                                  />
                                  <Label htmlFor={`custom-${reg.id}`} className="text-xs font-normal">Estola Pers.</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Checkbox 
                                    id={`printed-${reg.id}`}
                                    checked={!!edit_form.printed_photos}
                                    onCheckedChange={(val) => set_edit_form({...edit_form, printed_photos: !!val})}
                                  />
                                  <Label htmlFor={`printed-${reg.id}`} className="text-xs font-normal">30 Fotos Impr.</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Select
                                    value={typeof edit_form.fotos_titulo === "string" ? edit_form.fotos_titulo : (edit_form.fotos_titulo ? "UAZ" : "No")}
                                    onValueChange={(val) => set_edit_form({...edit_form, fotos_titulo: val})}
                                  >
                                    <SelectTrigger className="h-6 text-[10px] w-full">
                                      <SelectValue placeholder="Fotos Título" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {FOTOS_TITULO_OPTIONS.map(opt => <SelectItem key={opt} value={opt} className="text-[10px]">{opt}</SelectItem>)}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col gap-1">
                               {reg.stole_and_cap && <span className="text-[10px] text-green-600 font-semibold">• Toga y Birrete</span>}
                              {reg.custom_stole && reg.custom_stole !== "No requerida" && <span className="text-[10px] text-blue-600 font-semibold">• Estola: {reg.custom_stole}</span>}
                              {reg.printed_photos && <span className="text-[10px] text-orange-600 font-semibold">• 30 Fotos Impresas</span>}
                              {(typeof reg.fotos_titulo === "string" && reg.fotos_titulo !== "No") ? <span className="text-[10px] text-purple-600 font-semibold">• Fotos de Título: {reg.fotos_titulo}</span> : (reg.fotos_titulo === true && <span className="text-[10px] text-purple-600 font-semibold">• Fotos de Título: UAZ</span>)}
                              {!reg.stole_and_cap && (reg.custom_stole === "No requerida" || !reg.custom_stole) && !reg.printed_photos && (!reg.fotos_titulo || reg.fotos_titulo === "No") && <span className="text-muted-foreground text-[10px] italic">Sin extras</span>}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-serif">
                          <span className="font-semibold">{format_currency(total)}</span>
                        </TableCell>
                        <TableCell className="font-serif">
                          <div className="flex flex-col">
                            {is_editing ? (
                              <div className="relative">
                                <span className="absolute left-2 top-1.5 text-xs text-muted-foreground">$</span>
                                <Input 
                                  type="number"
                                  value={edit_form.anticipo || ""}
                                  onChange={(e) => set_edit_form({...edit_form, anticipo: Number(e.target.value)})}
                                  className="h-8 pl-5 text-sm w-24 text-primary font-bold"
                                />
                              </div>
                            ) : (
                              <span className="text-primary font-bold">{format_currency(anticipo)}</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-serif">
                          <span className="text-muted-foreground font-medium">{format_currency(restante)}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            {is_editing ? (
                              <>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600" onClick={handle_save}>
                                  <Check className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600" onClick={() => set_editing_id(null)}>
                                  <X className="w-4 h-4" />
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-600" onClick={() => handle_edit_click(reg)}>
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => handle_delete(reg.id!)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
          
          {!is_loading && filtered_registrations.length > 0 && (
            <div className="flex justify-end pt-4 border-t">
              <div className="bg-muted/30 p-4 rounded-lg border flex flex-wrap gap-6 sm:gap-10">
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Total del Evento</span>
                  <span className="text-xl font-bold font-serif whitespace-nowrap">
                    {format_currency(filtered_registrations.reduce((acc, reg) => acc + calculate_totals(reg).total, 0))}
                  </span>
                </div>
                <div className="flex flex-col border-l pl-6 sm:pl-10">
                  <span className="text-[10px] text-primary/80 uppercase tracking-wider font-bold">Anticipo Recaudado</span>
                  <span className="text-xl font-bold font-serif text-primary whitespace-nowrap">
                    {format_currency(filtered_registrations.reduce((acc, reg) => acc + calculate_totals(reg).anticipo, 0))}
                  </span>
                </div>
                <div className="flex flex-col border-l pl-6 sm:pl-10">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Restante Pendiente</span>
                  <span className="text-xl font-bold font-serif text-muted-foreground whitespace-nowrap">
                    {format_currency(filtered_registrations.reduce((acc, reg) => acc + calculate_totals(reg).restante, 0))}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
