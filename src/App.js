import CategoryDirectory from "./components/category-directory/category-directory.component";

import categories from "./utils/categories.json";

function App() {
  return <CategoryDirectory categories={categories} />;
}

export default App;
