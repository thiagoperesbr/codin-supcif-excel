import { ReactNode } from 'react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface SummaryCardProps {
  icon: ReactNode
  title: string
  amount: string
}

const SummaryCard = ({ icon, title, amount }: SummaryCardProps) => {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-4">
        {icon}
        <p className="text-muted-foreground">{title}</p>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold">{amount}</p>
      </CardContent>
    </Card>
  )
}

export default SummaryCard
