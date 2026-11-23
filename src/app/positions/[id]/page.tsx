import { positionsData } from '@/data/positions';
import PositionDetail from './PositionDetail';

export const dynamicParams = false;

export function generateStaticParams() {
  return positionsData.map((p) => ({ id: p.id }));
}

export default function PositionDetailPage() {
  return <PositionDetail />;
}
