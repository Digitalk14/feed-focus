export const ErrorView = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 p-8 max-w-md">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};
