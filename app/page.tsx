import Link from "next/link";
import Image from "next/image";
import { crossSellProducts, earrings } from "@/lib/lookBuilderData";

export default function HomePage() {
  return (
    <main className="landing">
      <section className="hero">
        <p className="eyebrow">Earrings</p>
        <h1>Shop the perfect hoops, studs, and stacks.</h1>
        <p>
          Inspired by Banter&apos;s earrings landing: start with a guided quiz, get personalized picks,
          then build your stack in an interactive look builder.
        </p>
        <div className="hero-cta">
          <Link href="/look-builder" className="button-primary">
            Start with a Quiz
          </Link>
          <a
            className="button-secondary"
            href="https://www.banter.com/earrings-landing?icid=MEGA:EAR"
            target="_blank"
            rel="noreferrer"
          >
            Shop All Earrings
          </a>
        </div>
      </section>

      <section className="section-grid">
        <article className="promo-block">
          <h2>Shop By Style</h2>
          <p>Studs, hoops, flat backs, sets, huggies, and drop earrings.</p>
        </article>
        <article className="promo-block">
          <h2>Shop By Material</h2>
          <p>Gold, silver, diamond, gold plated, gold bonded, and gemstones.</p>
        </article>
        <article className="promo-block">
          <h2>Ready To Stack?</h2>
          <p>Try model ears or use your own ear in live camera mode.</p>
        </article>
      </section>

      <section>
        <div className="section-header">
          <h2>New Arrivals</h2>
          <Link href="/look-builder">Build Your Look</Link>
        </div>
        <div className="product-grid">
          {earrings.map((product) => (
            <article key={product.id} className="product-card">
              <Image src={product.image} alt={product.name} width={260} height={260} />
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2>Beyond Earrings</h2>
          <a href="https://www.banter.com/view-all-jewelry/c/1725450" target="_blank" rel="noreferrer">
            Shop All Jewelry
          </a>
        </div>
        <div className="product-grid">
          {crossSellProducts.map((product) => (
            <article key={product.id} className="product-card">
              <Image src={product.image} alt={product.name} width={260} height={260} />
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
