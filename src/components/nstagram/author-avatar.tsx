export const AuthorAvatar = ({
  author,
  sponsored,
}: {
  author: string;
  sponsored?: boolean;
}) => {
  // Generate random HSL color for consistent, pleasing colors
  const randomColor = `hsl(${Math.random() * 360}, 70%, 80%)`;

  return (
    <div className="flex items-center gap-2" style={{ color: "white" }}>
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-white"
        style={{ backgroundColor: randomColor }}
      >
        {/* Display first letter of author name */}
        <p className="text-sm font-medium text-white font-bold">
          {author.charAt(0).toUpperCase()}
        </p>
      </div>
      <div className="flex flex-col">
        <span
          className="text-sm font-medium"
          style={{ color: sponsored ? "#333" : "white", fontSize: "12px", fontWeight: "700" }}
        >
          {author}
        </span>
        {sponsored && (
          <span className="text-xs font-medium text-[#333]">Sponsored</span>
        )}
      </div>
    </div>
  );
};
