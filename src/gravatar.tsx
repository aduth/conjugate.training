import useSWR from 'swr';
import { Avatar, AvatarImage } from './components/ui/avatar';

const GRAVATAR_BASE_URL = 'https://www.gravatar.com/avatar/';

interface GravatarProps {
  email?: string;
}

const toHex = (ab: ArrayBuffer): string =>
  Array.from(new Uint8Array(ab))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

async function getDigest(input: string): Promise<string> {
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return toHex(buffer);
}

async function getGravatarURL(email: string) {
  const hash = await getDigest(email);
  const url = new URL(hash, GRAVATAR_BASE_URL);
  url.searchParams.set('d', 'mp');
  return url.toString();
}

function Gravatar({ email }: GravatarProps) {
  const { data: emailHash } = useSWR(email ?? null, getGravatarURL);

  return <Avatar>{emailHash && <AvatarImage src={emailHash} />}</Avatar>;
}

export default Gravatar;
