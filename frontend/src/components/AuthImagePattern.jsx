const AuthImagePattern = ({ title, subtitle }) => {
  const images = [
    '/auth-images/pic1.png',
    '/auth-images/pic2.png',
    '/auth-images/pic3.png',
    '/auth-images/pic4.png',
    '/auth-images/pic5.png',
    '/auth-images/pic6.png',
    '/auth-images/pic7.png',
    '/auth-images/pic8.png',
    '/auth-images/pic9.png'
  ];

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <img
              key={i}
              src={images[i]}
              alt={`Auth pattern ${i + 1}`}
              className="aspect-square rounded-2xl object-cover"
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
