export default function Kartu({ judul, children }) {
    return (
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-2x1 font-bold text-utama">
                {judul}
            </h2>

            {children}
        </section>
    );
}