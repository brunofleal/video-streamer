import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Video from "./Video";
import Videos from "./Videos";

function Home() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/video/:videoname" element={<Video />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
  );
}

function Root() {
    return <h2>Root</h2>
}

function NotFound() {
    return <h2>Not Found</h2>
}

export default Home;