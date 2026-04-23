import { Outlet } from "react-router";
import { Footer } from "~/shared/components/presenters/Footer";
import { GridBackground } from "~/shared/components/presenters/GridBackground";
import { Header } from "~/shared/components/presenters/Header";
import { ScanlineOverlay } from "~/shared/components/presenters/ScanlineOverlay";

export default function RootLayout() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <GridBackground />
      <ScanlineOverlay />
      <div className="relative z-[2] flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
