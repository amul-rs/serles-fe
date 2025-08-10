import styles from "./Button.module.scss";

export default function Button({ variant = "primary", children, className = "", ...props }) {
  let bsVariant;
  switch (variant) {
    case "secondary":
      bsVariant = "btn-secondary";
      break;
    case "danger":
      bsVariant = "btn-danger";
      break;
    case "primary":
    default:
      bsVariant = "btn-primary";
      break;
  }

  // Combine Bootstrap class, custom css class with any passed className
  const combinedClassName = [bsVariant, styles.customButton, className].filter(Boolean).join(" ");

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}