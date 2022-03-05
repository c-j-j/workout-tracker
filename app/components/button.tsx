export const Button2: React.FC = ({ children }) => {
  return (
    <button
      className="w-full md:w-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      type="submit"
    >
      {children}
    </button>
  );
};

export const Button: React.FC = (props) => {
  return (
    <button
      className="w-full md:w-auto bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      {...props}
    >
      {props.children}
    </button>
  );
};
