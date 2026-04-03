import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { ModeSelection } from './pages/ModeSelection';
import { Explore } from './pages/Explore';
import { SpotDetail } from './pages/SpotDetail';
import { ReviewNew } from './pages/ReviewNew';
import { Profile } from './pages/Profile';
import { Curation } from './pages/Curation';
import { NotFound } from './pages/NotFound';
import { NavBar } from './components/NavBar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark">
      <NavBar />
      {children}
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: '/mode/:mode',
    element: (
      <Layout>
        <ModeSelection />
      </Layout>
    ),
  },
  {
    path: '/explore/:mode/:category',
    element: (
      <Layout>
        <Explore />
      </Layout>
    ),
  },
  {
    path: '/spot/:spotId',
    element: (
      <Layout>
        <SpotDetail />
      </Layout>
    ),
  },
  {
    path: '/spot/:spotId/review/new',
    element: (
      <Layout>
        <ReviewNew />
      </Layout>
    ),
  },
  {
    path: '/profile',
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
  },
  {
    path: '/curation',
    element: (
      <Layout>
        <Curation />
      </Layout>
    ),
  },
  {
    path: '*',
    element: (
      <Layout>
        <NotFound />
      </Layout>
    ),
  },
]);