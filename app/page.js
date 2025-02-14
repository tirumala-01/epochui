import { Truck } from 'lucide-react';
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2">
        <Truck width={'56px'} height={'56px'} strokeWidth={'1px'} color="#059669"/>
        <h1 className="text-4xl pb-4 text-sky-600"> Acme Logistics </h1>
        <h2 className="text-lg text-sky-600"> Get started by choosing from the menu </h2>
      </main>
    </div>
  );
}
