import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Lock, Eye, EyeOff } from "lucide-react";
import { login_admin } from "@/functions/auth";
import { ERROR_INVALID_CREDENTIALS, SUCCESS_LOGIN } from "@/utils/constants";

const AdminLogin = () => {
  const [email_input, set_email_input] = useState("");
  const [password_input, set_password_input] = useState("");
  const [show_password, set_show_password] = useState(false);
  const [is_loading, set_is_loading] = useState(false);
  const navigation_hook = useNavigate();

  const handle_login_submit = async (event: React.FormEvent) => {
    event.preventDefault();
    set_is_loading(true);

    const is_login_successful = await login_admin(email_input, password_input);

    if (is_login_successful) {
      toast.success(SUCCESS_LOGIN);
      navigation_hook("/admin/agenda");
    } else {
      toast.error(ERROR_INVALID_CREDENTIALS);
      set_is_loading(false);
    }
  };

  let submit_button_text = "Iniciar Sesión";
  if (is_loading) {
    submit_button_text = "Validando...";
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-4 mt-16">
        <Card className="w-full max-w-md shadow-lg border-2 border-muted">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-serif">Admin Login</CardTitle>
            <CardDescription>
              Acceso exclusivo para el fotógrafo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handle_login_submit} className="space-y-4">
              <div className="space-y-2 text-left">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="ej. correo@ejemplo.com" 
                  value={email_input}
                  onChange={(event) => set_email_input(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2 text-left">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Input 
                    id="password"
                    type={show_password ? "text" : "password"}
                    value={password_input}
                    onChange={(event) => set_password_input(event.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => set_show_password(!show_password)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                    aria-label={show_password ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {show_password ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="pt-2">
                <Button type="submit" className="w-full" disabled={is_loading}>
                  {submit_button_text}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col text-sm text-muted-foreground border-t bg-muted/20 p-4">
            <p className="text-center text-xs">
              Si no tienes credenciales de acceso, contacta al administrador del sistema.
            </p>
          </CardFooter>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminLogin;
