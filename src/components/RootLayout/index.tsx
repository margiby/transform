import { ReactElement, Suspense } from "react";
import { IntlProvider } from "react-intl";
import { Outlet } from "react-router";
import { useLocale, DE, MetaLanguage } from "@/hooks/Context";
import useMessages from "@/hooks/useMessages";
import Header from "../Header";
import Footer from "../Footer";
import LoadingSpinner from "../common/LoadingSpinner";
import HomePageSkeleton from "../common/HomePageSkeleton";

//Die Root-Komponente ist nun zuständig für das Hauptlayout der Anwendung, 
// inklusive Internationalisierung und Sprachkontext.
const RootLayout = (): ReactElement => {
  const [{ activeLocale }] = useLocale();
  const messages = useMessages(activeLocale);

  if (!messages) {
    return (
      <div className="loading-fullpage">
        <LoadingSpinner message="Loading translations..." />
      </div>
    );
  }

  return (
    <IntlProvider locale={activeLocale} messages={messages} defaultLocale={DE}>
      <div className="app-wrapper">
        <Header />
        <main className="main-content-area">
          <Suspense fallback={<HomePageSkeleton />}>
            <Outlet /> {/* Hier werden die Kind-Routen gerendert */}
          </Suspense>
        </main>
        <MetaLanguage />
      </div>
      <Footer />
    </IntlProvider>
  );
};

export default RootLayout;
