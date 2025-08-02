import Index from '@/components/Index';
import Myfavorite from '@/components/Myfavorite';
import NavbarSite from '@/components/navbarSite'

export default async function Page() {

  return (
    <div>
      <NavbarSite />
      <Myfavorite />
    </div>
  );
}

