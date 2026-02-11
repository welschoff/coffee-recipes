import Image from 'next/image';
import Divider from './Divider';
import { CoffeeProps } from '@/types/CoffeeRecipe';

export default function CoffeeCard({ ...props }: CoffeeProps) {
  return (
    <div className="flex flex-col w-full max-w-xs gap-2 bg-slate-100 border border-slate-300 rounded-2xl p-2">
      <div className="relative w-64 h-64 self-center">
        <Image
          src={props.image}
          alt="Coffee Image"
          fill
          className="object-cover rounded-full"
          priority
        />
      </div>
      <Divider />
      <span className="text-xl font-semibold">{props.title}</span>
      <Divider />
      <p>{props.description}</p>
      <Divider />
      <div>
        <span className="font-semibold">Ingredients</span>
        <ul>
          {props.ingredients.map((ingredient: string) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <Divider />
      <div>
        <span className="font-semibold">Tags</span>
        <ul>
          {props.tags.map((tag: string) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
