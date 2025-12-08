interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  // animate-pulse: Efek berdenyut bawaan Tailwind
  // bg-white/5: Warna abu-abu transparan (cocok untuk Dark Mode)
  return (
    <div className={`animate-pulse rounded-2xl bg-white/5 ${className}`} />
  );
}