import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { ResumeData, ResumeBuilderState, TemplateId } from '../types/resume'
import { createDefaultResumeData } from '../utils/defaults'
import { formatLastSaved, loadState, saveState } from '../utils/storage'

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

interface ResumeContextValue {
  data: ResumeData
  selectedTemplateId: TemplateId | null
  lastSavedAt: string | null
  saveStatus: SaveStatus
  saveError: string | null
  setSelectedTemplateId: (id: TemplateId) => void
  updateData: (updater: (prev: ResumeData) => ResumeData) => void
  saveDraft: () => void
  resetData: () => void
}

const ResumeContext = createContext<ResumeContextValue | null>(null)

export function ResumeProvider({ children }: { children: ReactNode }) {
  const initial = loadState()
  const [state, setState] = useState<ResumeBuilderState>({
    data: initial.data,
    selectedTemplateId: initial.selectedTemplateId,
  })
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(initial.lastSavedAt)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>(initial.lastSavedAt ? 'saved' : 'idle')
  const [saveError, setSaveError] = useState<string | null>(null)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const stateRef = useRef(state)
  stateRef.current = state

  const persist = useCallback((next: ResumeBuilderState, manual = false) => {
    try {
      setSaveStatus('saving')
      setSaveError(null)
      const savedAt = saveState(next)
      setLastSavedAt(savedAt)
      setSaveStatus('saved')
      if (manual) {
        setSaveStatus('saved')
      }
    } catch (err) {
      setSaveStatus('error')
      setSaveError(err instanceof Error ? err.message : 'Could not save draft')
    }
  }, [])

  // Autosave — debounced 400ms after any change
  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    setSaveStatus((s) => (s === 'error' ? 'error' : 'saving'))

    saveTimer.current = setTimeout(() => {
      persist(stateRef.current)
    }, 400)

    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
    }
  }, [state, persist])

  // Save immediately before tab close / refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        saveState(stateRef.current)
      } catch {
        /* best effort */
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  const setSelectedTemplateId = useCallback((id: TemplateId) => {
    setState((prev) => ({ ...prev, selectedTemplateId: id }))
  }, [])

  const updateData = useCallback((updater: (prev: ResumeData) => ResumeData) => {
    setState((prev) => ({ ...prev, data: updater(prev.data) }))
  }, [])

  const saveDraft = useCallback(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    persist(stateRef.current, true)
  }, [persist])

  const resetData = useCallback(() => {
    const empty = { data: createDefaultResumeData(), selectedTemplateId: null }
    setState(empty)
    persist(empty)
  }, [persist])

  const value = useMemo(
    () => ({
      data: state.data,
      selectedTemplateId: state.selectedTemplateId,
      lastSavedAt,
      saveStatus,
      saveError,
      setSelectedTemplateId,
      updateData,
      saveDraft,
      resetData,
    }),
    [state, lastSavedAt, saveStatus, saveError, setSelectedTemplateId, updateData, saveDraft, resetData],
  )

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
}

export function useResume() {
  const ctx = useContext(ResumeContext)
  if (!ctx) throw new Error('useResume must be used within ResumeProvider')
  return ctx
}

export { formatLastSaved }
