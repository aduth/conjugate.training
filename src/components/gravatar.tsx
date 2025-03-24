import useSWR from 'swr';

const GRAVATAR_BASE_URL = 'https://www.gravatar.com/avatar/';

interface GravatarProps {
  email?: string;

  size?: number;
}

const toHex = (ab: ArrayBuffer): string =>
  Array.from(new Uint8Array(ab))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

async function getDigest(input: string): Promise<string> {
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return toHex(buffer);
}

async function getGravatarURL(email: string, size?: number) {
  const hash = await getDigest(email);
  const url = new URL(hash, GRAVATAR_BASE_URL);
  url.searchParams.set('d', 'mp');
  if (size) url.searchParams.set('s', (size * 2).toString());
  return url.toString();
}

function Gravatar({ email, size }: GravatarProps) {
  const { data: url } = useSWR(email ? [email, size] : null, ([email, size]) =>
    getGravatarURL(email, size),
  );

  if (!url) return null;

  return <img src={url} alt="Avatar" width={size} height={size} className="rounded-full" />;
}

export default Gravatar;
