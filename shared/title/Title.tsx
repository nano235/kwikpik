import styles from "./Title.module.scss";

interface Props {
	title?: string;
	description?: string;
	className?: string;
	badge?: string;
	badgeClassName?: string;
	titleClassName?: string;
	descriptionClassName?: string;
}

const Title = ({
	title,
	description,
	className,
	badge,
	badgeClassName,
	titleClassName,
	descriptionClassName,
}: Props) => {
	return (
		<div className={`${styles.title} ${className}`}>
			<div className={`${styles.badge} ${badgeClassName}`}>{badge}</div>
			<h1 className={titleClassName}>{title}</h1>
			<p className={descriptionClassName}>{description}</p>
		</div>
	);
};

export default Title;
