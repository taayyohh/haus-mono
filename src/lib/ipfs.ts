const GATEWAY_URL = process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL || 'https://plantmaterial.mypinata.cloud';
const GATEWAY_TOKEN = process.env.NEXT_PUBLIC_PINATA_GATEWAY_TOKEN || '';

export function ipfsUrl(cidOrUrl: string): string {
  if (!cidOrUrl) return '';

  // Already a fully-formed gateway URL with token — return as-is
  if (cidOrUrl.startsWith('http') && cidOrUrl.includes('pinataGatewayToken')) return cidOrUrl;

  // Non-IPFS HTTP URL — return as-is
  if (cidOrUrl.startsWith('http') && !cidOrUrl.includes('/ipfs/')) return cidOrUrl;

  let cid: string;
  if (cidOrUrl.startsWith('ipfs://')) {
    cid = cidOrUrl.replace('ipfs://', '');
  } else if (cidOrUrl.includes('/ipfs/')) {
    // Extract CID+path without any query params
    const afterIpfs = cidOrUrl.split('/ipfs/').pop()!;
    cid = afterIpfs.split('?')[0];
  } else {
    cid = cidOrUrl;
  }

  const tokenParam = GATEWAY_TOKEN ? `?pinataGatewayToken=${GATEWAY_TOKEN}` : '';
  return `${GATEWAY_URL}/ipfs/${cid}${tokenParam}`;
}

export function ipfsPublicUrl(cidOrUrl: string): string {
  if (!cidOrUrl) return '';
  if (cidOrUrl.startsWith('http') && !cidOrUrl.includes('/ipfs/')) return cidOrUrl;
  const cid = cidOrUrl.includes('/ipfs/')
    ? cidOrUrl.split('/ipfs/').pop()!
    : cidOrUrl;
  return `${GATEWAY_URL}/ipfs/${cid}`;
}
