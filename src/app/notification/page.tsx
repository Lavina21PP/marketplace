import AboutPage from '@/components/AboutPage';
import NavbarSite from '@/components/navbarSite'
import NotificationsPage from '@/components/Notification';


export default async function Page() {

  return (
    <div>
      <NavbarSite />
      <NotificationsPage />
    </div>
  );
}

