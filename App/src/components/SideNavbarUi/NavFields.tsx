interface NavFieldProps {
  text: string;
  startIcon: React.ReactElement;
}

const NavFields = ({ text, startIcon }: NavFieldProps) => {
  return (
    <div className="flex items-center gap-3 p-3 pl-6 rounded-lg hover:bg-gradient-to-r hover:from-purple-200 hover:via-blue-200 hover:to-indigo-200 cursor-pointer transition-all duration-200">
      <div className="text-xl">{startIcon}</div>
      <span className="font-semibold text-lg">{text}</span>
    </div>
  );
};

export default NavFields;
