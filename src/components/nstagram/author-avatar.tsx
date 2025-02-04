export const AuthorAvatar = ({ author }: { author: string }) => {
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
      <span
        className="text-sm font-medium"
        style={{ color: "white", fontSize: "12px", fontWeight: "700" }}
      >
        {author}
      </span>
    </div>
  );
};
