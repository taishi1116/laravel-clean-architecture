import { TopHeader } from 'src/components/header/TopHeader';
import { Footer } from 'src/components/footer/Footer';

export default function Layout({ children }) {
  return (
    <>
      <div className="font-family">
        <TopHeader />
        {children}
        <Footer />
      </div>
      <style jsx>{`
        .font-family {
          font-family: Noto Sans JP;
        }
      `}</style>
    </>
  );
}
