import { CategoryPage } from "@/components/library/CategoryPage";
import { getCategoryById } from "@/data/library-categories";

export default function RegulationPage() {
  const category = getCategoryById("regulation");

  if (!category) {
    return <div>Category not found</div>;
  }

  return <CategoryPage category={category} />;
}
