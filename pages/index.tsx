import Link from 'next/link';
import { Roboto } from 'next/font/google';

const roboto = Roboto();

export default function Home() {
  return (
    <main className={roboto.className}>
      <div className="flex h-screen text-6xl leading-17 tracking-wider">
        <Link
          href="/hot-coffee"
          className="flex-1 flex items-center justify-center underline cursor-pointer bg-[#927869] hover:bg-amber-100"
        >
          HOT <br />
          COFFEE <br />
          RECIPES <br />
        </Link>
        <Link
          href="/cold-coffee"
          className="flex-1 flex items-center justify-center underline cursor-pointer bg-[#BA9D8A] hover:bg-amber-200"
        >
          COLD <br />
          COFFEE <br />
          RECIPES <br />
        </Link>
      </div>
    </main>
  );
}
