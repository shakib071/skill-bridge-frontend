
import { CategoriesTable } from '@/components/modules/Admin/CategoryTable';
import { categoryService } from '@/services/category.service'


export default async function Page() {
  const categoriesData = await categoryService.getAllCategory();
  console.log(categoriesData?.data?.data);
    
  return (
    <div>
      
      <CategoriesTable categories={categoriesData?.data?.data}></CategoriesTable>
    </div>
  )
}
