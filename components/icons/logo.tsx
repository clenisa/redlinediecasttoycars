import clsx from 'clsx';

export default function LogoIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${process.env.SITE_NAME} logo`}
      viewBox="0 0 32 32"
      {...props}
      className={clsx('h-4 w-4 fill-black dark:fill-white', props.className)}
    >
      {/* Stylized race car silhouette */}
      <path d="M2 20c0-1 .5-2 1.5-2.5L8 16l2-4h12l2 4 4.5 1.5c1 .5 1.5 1.5 1.5 2.5v2H2v-2z" />
      <circle cx="8" cy="22" r="3" />
      <circle cx="24" cy="22" r="3" />
      <path d="M10 12h12l1 2H9l1-2z" opacity="0.6" />
    </svg>
  );
}
