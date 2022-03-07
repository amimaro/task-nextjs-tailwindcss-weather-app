export const CitySelectorWrapper: React.FC = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-10 border-b-2"></div>
      <div className="flex">{children}</div>
      <div className="flex-grow border-b-2"></div>
    </div>
  );
};
