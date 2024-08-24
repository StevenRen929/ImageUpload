import { Outlet, Link } from "react-router-dom";
import ImageGallery from "./ImageGallery";
import ImageUpload from "./ImageUpload";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/ImageUpload.jsx">Image Upload</Link>
          </li>
          <li>
            <Link to="/ImageGallery.jsx">Gallery</Link>
          </li>

        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;