import { GetStaticProps, InferGetServerSidePropsType } from 'next';
import { CoffeeProps } from '@/types/CoffeeRecipe';
import CoffeeCard from '@/components/CoffeeCard';
import Link from 'next/link';

function isValid(item: CoffeeProps) {
  return (
    item &&
    typeof item.id === 'number' &&
    typeof item.title === 'string' &&
    typeof item.description === 'string' &&
    Array.isArray(item.ingredients) &&
    typeof item.image === 'string' &&
    item.image.startsWith('http')
  );
}

export const getStaticProps = (async () => {
  const res = await fetch('https://cof.cny.sh/iced');

  if (!res.ok) return { notFound: true };

  const rawData = await res.json();

  const data = Array.isArray(rawData) ? rawData.filter(isValid) : [];

  return {
    props: { data: data },
  };
}) satisfies GetStaticProps<{ data: CoffeeProps[] }>;

export default function ColdCoffeePage({
  data,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  const isValid = (recipe: CoffeeProps) =>
    Boolean(
      recipe.id && recipe.title && recipe.description && recipe.ingredients,
    );
  return (
    <div className="bg-[#BA9D8A] p-5">
      <div className="flex flex-col pb-5 text-2xl">
        <Link
          href="/"
          className="underline cursor-pointe uppercase hover:text-amber-100"
        >
          home
        </Link>
        <Link
          href="/hot-coffee"
          className="underline cursor-pointe uppercase hover:text-amber-100"
        >
          hot coffee recipes
        </Link>
      </div>
      <div className="flex flex-wrap gap-5">
        {data.filter(isValid).map((recipe: CoffeeProps) => (
          <CoffeeCard key={recipe.id} {...recipe} />
        ))}
      </div>
    </div>
  );
}
