import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { RecoilRoot } from 'recoil';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { registerServiceWorker } from './util/registerServiceWorker.ts';

const queryClient = new QueryClient();

// const enableMocking = async () => {
//   if (process.env.NODE_ENV !== 'development') {
//     return;
//   }

//   const { worker } = await import('./mocks/browser');
//   return worker.start();
// };

// enableMocking().then(() => {
//   ReactDOM.createRoot(document.getElementById('root')!).render(
//     <React.StrictMode>
//       <QueryClientProvider client={queryClient}>
//         <RecoilRoot>
//           <App />
//         </RecoilRoot>
//         <ReactQueryDevtools initialIsOpen={false} />
//       </QueryClientProvider>
//     </React.StrictMode>,
//   );
// });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
);

registerServiceWorker();
