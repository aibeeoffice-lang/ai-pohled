import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { SkinAd } from '@/components/ads';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <SkinAd>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </SkinAd>
  );
};

export default Layout;
