import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { StoreProvider } from '@/context/StoreContext'
import { AboutPage } from '@/pages/AboutPage'
import { ArtistFolioPage } from '@/pages/ArtistFolioPage'
import { ArtistsPage } from '@/pages/ArtistsPage'
import { CollabsPage } from '@/pages/CollabsPage'
import { HomePage } from '@/pages/HomePage'
import { StoryPage } from '@/pages/StoryPage'
import { StudioPage } from '@/pages/StudioPage'

export function App() {
  return (
    <StoreProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/story/:slug" element={<StoryPage />} />
            <Route path="/artists" element={<ArtistsPage />} />
            <Route path="/artists/:handle" element={<ArtistFolioPage />} />
            <Route path="/collabs" element={<CollabsPage />} />
            <Route path="/studio" element={<StudioPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App
