export default function Empty({ children }) {
  return (
    <section className="absolute left-20 z-2">
      <h1 className="text-[26px] mb-10">{children}</h1>
    </section>
  );
}
