import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Camera, Users, Star } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_URL = "https://wa.me/524921234567?text=Hola%2C%20me%20interesa%20el%20paquete%20de%20tres%20sesiones";

const MainPackage = () => (
  <section id="paquetes" className="py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
          Nuestro Paquete <span className="text-primary">Estrella</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Todo lo que necesitas para inmortalizar tu graduación en una experiencia fotográfica completa.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mx-auto mt-12 max-w-lg"
      >
        <Card className="relative overflow-hidden border-primary/30 bg-card shadow-xl shadow-primary/10">
          <div className="absolute right-4 top-4 rounded-full bg-primary/10 p-2">
            <Star className="h-5 w-5 text-primary" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="font-serif text-2xl text-foreground">
              Paquete de Tres Sesiones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <span className="font-serif text-5xl font-bold text-primary">$1,700</span>
              <span className="ml-2 text-sm text-muted-foreground">MXN / persona</span>
            </div>

            <div className="space-y-3 text-sm text-foreground/80">
              <div className="flex items-start gap-3">
                <Camera className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Sesión Familiar, Temática y de Gala incluidas</span>
              </div>
              <div className="flex items-start gap-3">
                <Users className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Cotización grupal a partir de 8 personas</span>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="w-full bg-whatsapp text-whatsapp-foreground shadow-lg shadow-whatsapp/20 hover:bg-whatsapp/90"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Reservar por WhatsApp
              </a>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  </section>
);

export default MainPackage;
