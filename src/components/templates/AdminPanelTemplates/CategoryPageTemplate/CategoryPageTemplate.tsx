import AddCategoryForm from '../../../organism/AddCategoryForm/AddCategoryForm'
import CategoryList from '../../../organism/CategoryList/CategoryList'
import styles from './CategoryPageTemplate.module.scss'

const CategoryPageTemplate = () => {
	return (
		<div className={styles.categoryPageContainer}>
			<AddCategoryForm />
			<CategoryList/>
		</div>
	)
}

export default CategoryPageTemplate
