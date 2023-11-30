import { Button } from '@/shared/ui/button'
import { IconSwitchHorizontal } from '@tabler/icons-react'
import { useSwitchSourceAndTarget } from './model'

export const CurrenciesSwitcher = () => {
  const switchSourceAndTarget = useSwitchSourceAndTarget()
  return (
    <Button onClick={switchSourceAndTarget} variant="light">
      <IconSwitchHorizontal />
    </Button>
  )
}
