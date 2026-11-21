import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  SEED_COLLABS,
  SEED_ENCOURAGEMENTS,
  SEED_PROFILES,
  SEED_WORKS,
} from '@/data/seed'
import type {
  CollabPost,
  EncouragementNote,
  MusicianProfile,
  ShowcaseWork,
} from '@/types/domain'

const STORAGE_KEYS = {
  works: 'altarandsound:works:v1',
  collabs: 'altarandsound:collabs:v1',
  encouragements: 'altarandsound:encouragements:v1',
} as const

function loadStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

interface StoreContextValue {
  profiles: MusicianProfile[]
  works: ShowcaseWork[]
  collabs: CollabPost[]
  encouragements: EncouragementNote[]
  getProfileById: (id: string) => MusicianProfile | undefined
  getProfileByHandle: (handle: string) => MusicianProfile | undefined
  getWorkBySlug: (slug: string) => ShowcaseWork | undefined
  addWork: (work: Omit<ShowcaseWork, 'id' | 'slug' | 'createdAt'>) => ShowcaseWork
  addCollab: (collab: Omit<CollabPost, 'id' | 'createdAt' | 'status'>) => CollabPost
  addEncouragement: (
    note: Omit<EncouragementNote, 'id' | 'createdAt'>
  ) => EncouragementNote
}

const StoreContext = createContext<StoreContextValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [profiles] = useState<MusicianProfile[]>(SEED_PROFILES)
  const [works, setWorks] = useState<ShowcaseWork[]>(() =>
    loadStored(STORAGE_KEYS.works, SEED_WORKS)
  )
  const [collabs, setCollabs] = useState<CollabPost[]>(() =>
    loadStored(STORAGE_KEYS.collabs, SEED_COLLABS)
  )
  const [encouragements, setEncouragements] = useState<EncouragementNote[]>(() =>
    loadStored(STORAGE_KEYS.encouragements, SEED_ENCOURAGEMENTS)
  )

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.works, JSON.stringify(works))
    } catch {
      // Ignore quota / blocked storage errors
    }
  }, [works])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.collabs, JSON.stringify(collabs))
    } catch {}
  }, [collabs])

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.encouragements,
        JSON.stringify(encouragements)
      )
    } catch {}
  }, [encouragements])

  const value = useMemo<StoreContextValue>(
    () => ({
      profiles,
      works,
      collabs,
      encouragements,
      getProfileById: (id) => profiles.find((p) => p.id === id),
      getProfileByHandle: (handle) => profiles.find((p) => p.handle === handle),
      getWorkBySlug: (slug) =>
        works.find((w) => w.slug === slug || w.id === slug),
      addWork: (input) => {
        const slugBase = input.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
        const created: ShowcaseWork = {
          ...input,
          id: `work-${Date.now()}`,
          slug: `${slugBase || 'work'}-${Date.now().toString(36).slice(-4)}`,
          createdAt: new Date().toISOString().slice(0, 10),
        }
        setWorks((prev) => [created, ...prev])
        return created
      },
      addCollab: (input) => {
        const created: CollabPost = {
          ...input,
          id: `collab-${Date.now()}`,
          status: 'open',
          createdAt: new Date().toISOString().slice(0, 10),
        }
        setCollabs((prev) => [created, ...prev])
        return created
      },
      addEncouragement: (input) => {
        const created: EncouragementNote = {
          ...input,
          id: `enc-${Date.now()}`,
          createdAt: new Date().toISOString().slice(0, 10),
        }
        setEncouragements((prev) => [created, ...prev])
        return created
      },
    }),
    [profiles, works, collabs, encouragements]
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}
