import KhulnasoftImage from './khulnasoft-image';
import Link from 'next/link';
import cn from 'classnames';

export default function CoverImage({ title, url, slug }) {
  const image = (
    <KhulnasoftImage
      width={2000}
      height={1000}
      alt={`Cover Image for ${title}`}
      className={cn('shadow-small', {
        'hover:shadow-medium transition-shadow duration-200': slug,
      })}
      src={url}
    />
  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/blog/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
