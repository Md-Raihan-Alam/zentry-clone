import PropTypes from "prop-types";

const Button = ({ title, id, rightIcon, leftIcon, containerClass }) => {
  return (
    <button
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}
    >
      {leftIcon}
      <span className="relative incline-flex overflow-hidden font-general text-xs uppercase">
        <div>{title}</div>
      </span>
      {rightIcon}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired, // Title must be a string and is required
  id: PropTypes.string, // id is optional but should be a string
  rightIcon: PropTypes.node, // React node (element, string, null, etc.)
  leftIcon: PropTypes.node, // React node
  containerClass: PropTypes.string, // Optional CSS classes as a string
};

Button.defaultProps = {
  id: "", // Default empty string for id
  rightIcon: null, // Default null for icons
  leftIcon: null,
  containerClass: "", // Default empty string for container class
};

export default Button;
