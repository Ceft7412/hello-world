export default function Empty({ children }) {
  return (
    <section className="absolute left-20 z-2">
      <h1 className="text-[22px] mb-10">{children}</h1>
    </section>
  );
}
