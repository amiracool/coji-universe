import { CategoryPage } from "@/components/library/CategoryPage";
import { getCategoryById } from "@/data/library-categories";

export default function ExecutiveFunctionPage() {
  const category = getCategoryById("executive-function");

  if (!category) {
    return <div>Category not found</div>;
  }

  return <CategoryPage category={category} />;
}
