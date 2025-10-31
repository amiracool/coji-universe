import { CategoryPage } from "@/components/library/CategoryPage";
import { getCategoryById } from "@/data/library-categories";

export default function RelationshipsPage() {
  const category = getCategoryById("relationships");

  if (!category) {
    return <div>Category not found</div>;
  }

  return <CategoryPage category={category} />;
}
