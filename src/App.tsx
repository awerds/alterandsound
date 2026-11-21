import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { StoreProvider } from '@/context/StoreContext'
import { ArticlePage } from '@/pages/ArticlePage'
import { CatalogPage } from '@/pages/CatalogPage'
import { HomePage } from '@/pages/HomePage'
import { ManifestoPage } from '@/pages/ManifestoPage'
import { ReleasePage } from '@/pages/ReleasePage'
import { SessionsPage } from '@/pages/SessionsPage'
import { SubmitPage } from '@/pages/SubmitPage'

export function App() {
  return (
    <StoreProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/journal/:slug" element={<ArticlePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/releases/:slug" element={<ReleasePage />} />
            <Route path="/sessions" element={<SessionsPage />} />
            <Route path="/submit" element={<SubmitPage />} />
            <Route path="/manifesto" element={<ManifestoPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App
