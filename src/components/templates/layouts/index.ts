import type { ComponentType } from 'react'
import type { LayoutProps } from './LayoutComponents'
import {
  AtsCompact,
  AtsPlain,
  ModernAccentCorner,
  ModernSidebarLeft,
  ModernSidebarRight,
  ModernTopBand,
  ModernTwoCol,
  OneColStrict,
  PhotoLeftCol,
  PhotoSidebar,
  PhotoTopBanner,
  PhotoTopRight,
  ProCentered,
  ProExecutive,
  SimpleCentered,
  SimpleMinimal,
  SimpleSplitHeader,
  SimpleStack,
} from './LayoutComponents'

export type StructureId =
  | 'simple-stack'
  | 'simple-centered'
  | 'simple-split'
  | 'simple-minimal'
  | 'modern-sidebar-left'
  | 'modern-sidebar-right'
  | 'modern-top-band'
  | 'modern-two-col'
  | 'modern-accent-corner'
  | 'ats-plain'
  | 'ats-compact'
  | 'pro-centered'
  | 'pro-executive'
  | 'one-col-strict'
  | 'photo-left-col'
  | 'photo-top-banner'
  | 'photo-top-right'
  | 'photo-sidebar'

export const LAYOUT_MAP: Record<StructureId, ComponentType<LayoutProps>> = {
  'simple-stack': SimpleStack,
  'simple-centered': SimpleCentered,
  'simple-split': SimpleSplitHeader,
  'simple-minimal': SimpleMinimal,
  'modern-sidebar-left': ModernSidebarLeft,
  'modern-sidebar-right': ModernSidebarRight,
  'modern-top-band': ModernTopBand,
  'modern-two-col': ModernTwoCol,
  'modern-accent-corner': ModernAccentCorner,
  'ats-plain': AtsPlain,
  'ats-compact': AtsCompact,
  'pro-centered': ProCentered,
  'pro-executive': ProExecutive,
  'one-col-strict': OneColStrict,
  'photo-left-col': PhotoLeftCol,
  'photo-top-banner': PhotoTopBanner,
  'photo-top-right': PhotoTopRight,
  'photo-sidebar': PhotoSidebar,
}
