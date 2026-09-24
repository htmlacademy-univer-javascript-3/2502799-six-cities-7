import Main from './pages/Main.tsx';

type AppProps = {
  offerCounts: number;
}

function App({offerCounts}: AppProps) {
  return (
    <Main offerCounts={offerCounts}/>
  );
}

export default App;
