import ContactUsPage from '@/components/ContactUs';
import NavbarSite from '@/components/navbarSite'
import PrivacyPolicyPage from '@/components/PrivacyPolicyPage';


export default async function Page() {

  return (
    <div>
      <NavbarSite />
      <PrivacyPolicyPage />
    </div>
  );
}

