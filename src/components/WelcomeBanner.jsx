function WelcomeBanner({ user }) {
  return (
    <div className="mb-6">
      <h2 className="text-3xl font-bold">
        Welcome back, <span className="text-cyan-600">{user}</span>
      </h2>
    </div>
  );
}

export default WelcomeBanner;
