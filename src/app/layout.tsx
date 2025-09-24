import '../globals.css';
import { ClientProviders } from './provider/ClientProviders';

export const metadata = {
  title: 'Aidirectory',
  description: 'Your AI-powered directory solution',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#007acc',
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
