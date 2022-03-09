export const Label: React.FC<React.ComponentPropsWithoutRef<"label">> = (
  props
) => {
  const { children, ...rest } = props;
  return (
    <label className="block text-gray-700 text-sm font-bold mb-2" {...rest}>
      {children}
    </label>
  );
};
