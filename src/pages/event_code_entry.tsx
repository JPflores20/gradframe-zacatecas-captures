import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { KeyRound } from "lucide-react";
import { fetch_event_by_code } from "@/functions/database";
import { ERROR_INVALID_CODE_LENGTH, ERROR_CODE_NOT_FOUND, ERROR_VERIFYING_CODE, SUCCESS_CODE_VERIFIED, REQUIRED_CODE_LENGTH } from "@/utils/constants";

const EventCodeEntry = () => {
  const [event_code_input, set_event_code_input] = useState("");
  const [is_loading, set_is_loading] = useState(false);
  const navigation_hook = useNavigate();

  const handle_verify_code = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (event_code_input.trim().length !== REQUIRED_CODE_LENGTH) {
      toast.error(ERROR_INVALID_CODE_LENGTH);
      return;
    }

    set_is_loading(true);
    
    try {
      const upper_case_code = event_code_input.toUpperCase();
      const event_data = await fetch_event_by_code(upper_case_code);

      if (event_data === null) {
        toast.error(ERROR_CODE_NOT_FOUND);
      } else {
        toast.success(SUCCESS_CODE_VERIFIED);
        navigation_hook(`/registro/${upper_case_code}`);
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      toast.error(ERROR_VERIFYING_CODE);
    } finally {
      set_is_loading(false);
    }
  };

  let submit_button_text = "Ingresar";
  if (is_loading) {
    submit_button_text = "Verificando...";
  }

  const is_button_disabled = is_loading || event_code_input.trim().length !== REQUIRED_CODE_LENGTH;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-4 mt-16">
        <Card className="w-full max-w-md shadow-lg border-2 border-muted">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <KeyRound className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-serif">Ingresa tu Código</CardTitle>
            <CardDescription>
              Introduce el código de 6 caracteres proporcionado por tu fotógrafo para acceder al registro del evento.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handle_verify_code} className="space-y-4">
              <div className="space-y-2">
                <Input 
                  placeholder="Ej. A1B2C3" 
                  value={event_code_input}
                  onChange={(event) => set_event_code_input(event.target.value.toUpperCase())}
                  maxLength={REQUIRED_CODE_LENGTH}
                  className="text-center text-2xl tracking-[0.5em] font-mono h-14"
                />
              </div>
              <Button type="submit" className="w-full h-12 text-lg font-medium" disabled={is_button_disabled}>
                {submit_button_text}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-muted-foreground border-t bg-muted/20 p-4">
            Si no tienes un código, contacta a tu representante o fotógrafo.
          </CardFooter>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventCodeEntry;
