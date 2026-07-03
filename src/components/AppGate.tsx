import type { ReactNode } from 'react'
import { isAppAuthorized } from '../utils/appGuard'
import { LockedScreen } from './LockedScreen'

export function AppGate({ children }: { children: ReactNode }) {
  if (!isAppAuthorized()) return <LockedScreen />
  return children
}
