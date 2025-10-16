import HeaderText from "../../atoms/HeaderText/HeaderText"
import styles from './RelationshipPageTemplate.module.scss'

const RelationshipPageTemplate = () => {
  return (
    <section className={`${styles.relationshipContainer} sectionPages`}>
      <HeaderText>
        <h1>Relationship</h1>
      </HeaderText>
    </section>
  )
}

export default RelationshipPageTemplate