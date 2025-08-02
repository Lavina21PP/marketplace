import NavbarSite from "@/components/navbarSite";
import ProductDetailPage from "@/components/ProductDetail";

interface Props {
//   params: { pdID: string };
}

export default async function ProductPage() {
//   const { pdID } = params;

  return (
    <div>
      <NavbarSite />
      <ProductDetailPage />
    </div>
  );
}
