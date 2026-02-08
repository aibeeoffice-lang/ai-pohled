import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone } from 'lucide-react';

const ContactPage = () => {
  return (
    <Layout>
      <div className="container-wide py-12 lg:py-16 max-w-3xl mx-auto">
        <h1 className="font-display text-3xl lg:text-4xl font-bold mb-6">Kontakt</h1>

        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          Máš tip na téma, chceš spolupráci, nebo jen opravit chybu v článku? Napiš — ozveme se.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Mail className="h-5 w-5 text-primary" />
                E-mail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a href="mailto:info@aipohled.cz" className="text-primary hover:underline">
                info@aipohled.cz
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Phone className="h-5 w-5 text-primary" />
                Telefon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a href="tel:+420777123456" className="text-primary hover:underline">
                +420 777 123 456
              </a>
            </CardContent>
          </Card>
        </div>

        <p className="text-sm text-muted-foreground">
          Pozn.: Kontakty jsou zatím ukázkové — později sem doplníme finální údaje a případně fakturační informace.
        </p>
      </div>
    </Layout>
  );
};

export default ContactPage;
