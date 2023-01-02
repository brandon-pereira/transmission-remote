import styles from './Section.module.scss';

interface Props {
  title: string;
  description?: string;
  rightContent: React.ReactNode;
}

function SectionListItem({ title, description, rightContent }: Props) {
  return (
    <div className={styles.listItem}>
      <div className={styles.listItemLeftContent}>
        {title}
        {description}
      </div>
      {rightContent && (
        <div className={styles.listItemRightContent}>{rightContent}</div>
      )}
    </div>
  );
}

export default SectionListItem;
