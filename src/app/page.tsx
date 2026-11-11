import { Header } from "@/components/layout/Header";
import { ProductSection } from "@/components/products/ProductSection";
import { CartSidebar } from "@/components/cart/CartSidebar";
import { ToastContainer } from "@/components/ui/ToastContainer";

export default function HomePage() {
  return (
    <>
      <div className="mx-auto w-full max-w-[1200px] bg-white p-3 sm:p-5 min-h-screen">
        <Header />
        <ProductSection />
      </div>
      <CartSidebar />
      <ToastContainer />
    </>
  );
}
