// components/SuspenseBoundary.tsx

import { ReactNode, Suspense } from "react";

interface SuspenseBoundaryProps {
  children: ReactNode;
}

const SuspenseBoundary: React.FC<SuspenseBoundaryProps> = ({ children }) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export default SuspenseBoundary;
