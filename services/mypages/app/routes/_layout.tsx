import { Outlet } from "react-router";
import { Footer } from "~/shared/components/presenters/Footer";
import { Header } from "~/shared/components/presenters/Header";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
