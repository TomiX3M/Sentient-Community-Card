import { lazy, Suspense } from 'react';
import Loading from './components/Loading';

// Lazy load the main component
const SentientCardCreator = lazy(() => import('./components/home'));

export default function App() {
  return (
    <div className="min-h-screen w-full bg-gray-900">
      {/* Background elements */}
     
      <Suspense fallback={<Loading />}>
        <SentientCardCreator />
      </Suspense>
    </div>
  );
}
