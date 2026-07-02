import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { ResumeData, ResumeBuilderState, TemplateId } from '../types/resume'
import { createDefaultResumeData } from '../utils/defaults'
import { loadState, saveState } from '../utils/storage'

interface ResumeContextValue {
  data: ResumeData
  selectedTemplateId: TemplateId | null
  setSelectedTemplateId: (id: TemplateId) => void
  updateData: (updater: (prev: ResumeData) => ResumeData) => void
  resetData: () => void
}

const ResumeContext = createContext<ResumeContextValue | null>(null)

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ResumeBuilderState>(() => loadState())

  useEffect(() => {
    saveState(state)
  }, [state])

  const setSelectedTemplateId = useCallback((id: TemplateId) => {
    setState((prev) => ({ ...prev, selectedTemplateId: id }))
  }, [])

  const updateData = useCallback((updater: (prev: ResumeData) => ResumeData) => {
    setState((prev) => ({ ...prev, data: updater(prev.data) }))
  }, [])

  const resetData = useCallback(() => {
    setState({ data: createDefaultResumeData(), selectedTemplateId: null })
  }, [])

  const value = useMemo(
    () => ({
      data: state.data,
      selectedTemplateId: state.selectedTemplateId,
      setSelectedTemplateId,
      updateData,
      resetData,
    }),
    [state, setSelectedTemplateId, updateData, resetData],
  )

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
}

export function useResume() {
  const ctx = useContext(ResumeContext)
  if (!ctx) throw new Error('useResume must be used within ResumeProvider')
  return ctx
}
