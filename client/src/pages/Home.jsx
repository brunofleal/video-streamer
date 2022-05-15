import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Video from "./Video";
import Videos from "./Videos";
import { Link } from "@mui/material";

function Home() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/"  element={<Videos />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/video/:videoid" element={<Video />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
  );
}


function NotFound() {
    return <h2>Not Found</h2>
}

export default Home;