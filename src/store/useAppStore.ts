import { create } from 'zustand'

interface AppState {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  currentSection: string
  setCurrentSection: (section: string) => void
  cursorVariant: 'default' | 'hover' | 'text' | 'hidden'
  setCursorVariant: (variant: 'default' | 'hover' | 'text' | 'hidden') => void
  mousePosition: { x: number; y: number }
  setMousePosition: (position: { x: number; y: number }) => void
  isDarkMode: boolean
  toggleDarkMode: () => void
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),
  currentSection: 'hero',
  setCurrentSection: (section) => set({ currentSection: section }),
  cursorVariant: 'default',
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
  mousePosition: { x: 0, y: 0 },
  setMousePosition: (position) => set({ mousePosition: position }),
  isDarkMode: true,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  isMenuOpen: false,
  setIsMenuOpen: (open) => set({ isMenuOpen: open }),
}))
