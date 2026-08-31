import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ContactForm from '@/app/components/ContactForm';

export default async function ContactPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');

  if (!session) {
    redirect('/login');
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">ติดต่อเรา</h1>
      <ContactForm />
    </main>
  );
}