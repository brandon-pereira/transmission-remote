import styles from './Section.module.scss';

interface Props {
  title: string;
  description?: string | number;
  rightContent?: React.ReactNode;
}

function SectionListItem({ title, description, rightContent }: Props) {
  return (
    <div className={styles.listItem}>
      <div className={styles.listItemLeftContent}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
      {rightContent && (
        <div className={styles.listItemRightContent}>{rightContent}</div>
      )}
    </div>
  );
}

export default SectionListItem;
