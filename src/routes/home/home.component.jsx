import { Outlet } from "react-router-dom";
import CategoryDirectory from "../../components/category-directory/category-directory.component";

import categories from "../../utils/categories.json";

function Home() {
  return (
    <div>
      <CategoryDirectory categories={categories} />
    </div>
  );
}

export default Home;
