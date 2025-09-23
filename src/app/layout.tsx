import './globals.css';
import { ClientProviders } from './provider/ClientProviders';

export const metadata = {
  title: 'Aidirectory',
  description: 'Welcome to Aidirectory',
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
