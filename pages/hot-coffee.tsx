import CoffeeCard from '@/components/CoffeeCard';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { CoffeeProps } from '@/types/CoffeeRecipe';
import Link from 'next/link';

function isValid(item: CoffeeProps) {
  return (
    item &&
    typeof item.id === 'number' &&
    typeof item.title === 'string' &&
    typeof item.description === 'string' &&
    Array.isArray(item.ingredients) &&
    Array.isArray(item.tags) &&
    typeof item.image === 'string' &&
    item.image.startsWith('http')
  );
}

export const getStaticProps = (async () => {
  const res = await fetch('https://cof.cny.sh/hot');

  if (!res.ok) return { notFound: true };

  const rawData = await res.json();

  const data = Array.isArray(rawData) ? rawData.filter(isValid) : [];

  return {
    props: { data: data },
  };
}) satisfies GetStaticProps<{ data: CoffeeProps[] }>;

export default function HotCoffeePage({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="bg-[#927869] p-5">
      <div className="flex flex-col pb-5 text-2xl">
        <Link
          href="/"
          className="underline cursor-pointe uppercase hover:text-amber-100"
        >
          home
        </Link>
        <Link
          href="/cold-coffee"
          className="underline cursor-pointe uppercase hover:text-amber-100"
        >
          cold coffee recipes
        </Link>
      </div>
      <div className=" flex flex-wrap gap-5">
        {data.map((recipe: CoffeeProps) => (
          <CoffeeCard key={recipe.title} {...recipe} />
        ))}
      </div>
    </div>
  );
}
