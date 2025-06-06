import { ReactNode } from 'react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface SummaryCardProps {
  icon: ReactNode
  title: string
  amount: string
}

const SummaryCard = ({ icon, title, amount }: SummaryCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="flex-row items-center gap-2">
        {icon}
        <p className="text-muted-foreground">{title}</p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <p className="text-4xl font-bold">{amount}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default SummaryCard
