import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import './components/Navbar';
import NavbarWrapper from './components/NavbarWrapper';
import FooterWrapper from './components/FooterWrapper';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        {/* Navbar Logic handled in NavbarWrapper */}
        <NavbarWrapper />
        {children}
        <FooterWrapper />
      </body>
    </html>
  );
}
