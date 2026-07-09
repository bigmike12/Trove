import { Card } from '@/shared/ui/Card'
import { Skeleton } from '@/shared/ui/Skeleton'

export function DashboardSkeleton() {
  return (
    <div aria-busy className="space-y-6">
      <div>
        <Skeleton className="h-6 w-56" />
        <Skeleton className="mt-2 h-4 w-72" />
      </div>

      <div className="grid gap-5 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="mt-3 h-8 w-44" />
          <Skeleton className="mt-3 h-4 w-64" />
        </Card>
        <Card className="lg:col-span-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="mt-5 h-9 w-full" />
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Card key={index} className="p-4 sm:p-5">
            <Skeleton className="h-3.5 w-20" />
            <Skeleton className="mt-3 h-5 w-24" />
            <Skeleton className="mt-2 h-3.5 w-28" />
          </Card>
        ))}
      </div>
    </div>
  )
}
