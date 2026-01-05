import styles from './CategoryList.module.scss'
import { useDeleteCategoryMutation, useFetchAllCategoriesQuery } from '../../../slices/api/categoriesApi'
import { CloseSVG } from '../../../assets/icons/adminPanelIcons/AdminPanelIcons'
import type { MouseEvent } from 'react'



const CategoryList = () => {
	const { data } = useFetchAllCategoriesQuery()
    const [deleteCategory] = useDeleteCategoryMutation()
	const handleDeleteCategory = async(e:MouseEvent<HTMLSpanElement>) => {
        const target = e.currentTarget as HTMLSpanElement
        const categoryId = target.dataset.id
       

        try {
            if(!categoryId) return
            const res = await deleteCategory(categoryId)
            console.log(res)
        } catch (error) {
            console.log(error)
        }

    }

	return (
		<div className={styles.categoryListContainer}>
			<p>Category List</p>
			<div className={styles.categoryListBox}>
				{data?.map((c) => (
					<span key={c._id} className={styles.category}>
						{c.name}{' '}
						<span data-id={c._id} className={styles.categoryDelete} onClick={(e) => handleDeleteCategory(e)}>
							<CloseSVG className={styles.closeSVG} />
						</span>
					</span>
				))}
			</div>
		</div>
	)
}

export default CategoryList
