import Header from "@/components/Header";
import Motion from "@/components/Motion";
import Picture from "@/components/Picture";
import { packageGroups, formatIdr, site } from "@/lib/content";
import BookingFrame from "@/components/BookingFrame";
import CheckoutDialog from "@/components/CheckoutDialog";
import FooterHeight from "@/components/FooterHeight";
import { BOOKING_URL, BOOK_ANCHOR, packageUrl, externalLinkProps } from "@/lib/momence";
import styles from "./page.module.css";

const THEMES = [
  {
    title: "Flex o’clock",
    text: "No rigid schedules, no crowded classes. The studio is open 7am – 8pm every day, so early riser, night owl or midday mover, you train when it suits you. Book online or walk in.",
  },
  {
    title: "Slay your way",
    text: "From full-body fundamentals and tone & sculpt to HIIT hybrid, physio-led rehab and gentle pre/post-natal classes. Train at your own pace, with no lagging behind and no being moved up before you’re ready.",
  },
  {
    title: "Choose your focus",
    text: "Build strength, improve flexibility, boost endurance or target one muscle group, or take on a 28-day challenge. New classes are added every week.",
  },
];

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <Motion />

      <main id="main">
        {/* Hero */}
        <section id="top" className={styles.hero} aria-labelledby="hero-title">
          <div className={`wrap grid ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <div className={`display ${styles.wordmark}`} data-hero="word" aria-hidden="true">
                <span>E</span>
                <span>R</span>
                <span>A</span>
              </div>
              <div className={styles.heroFoot} data-hero="fade">
                <h1 id="hero-title" className={styles.heroSub}>
                  <span className="sr-only">ERA: </span>On-demand reformer pilates
                </h1>
                <p className={styles.heroText}>
                  Bali’s first on-demand reformer pilates studio, in the heart of Bingin, Uluwatu.
                </p>
                <div className={styles.actions}>
                  <a href={BOOK_ANCHOR} className="btn">
                    Book a class
                  </a>
                  <a href="#packages" className="btn btn-ghost">
                    View packages
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.heroMedia} data-hero="media">
              <Picture slug="studio-crunch" priority sizes="(max-width: 860px) 100vw, 30vw" position="50% 40%" />
            </div>
          </div>
        </section>

        {/* Studio */}
        <section id="studio" className={styles.studio} aria-labelledby="studio-title">
          <div className={`wrap grid ${styles.studioGrid}`}>
            <h2 id="studio-title" className={`display ${styles.h2} ${styles.colHead}`} data-reveal>
              The studio
            </h2>
            <p className={`${styles.lead} ${styles.colBody}`} data-reveal>
              Choose from over 350 expert, instructor-led reformer classes and decide when you train, how you
              train and what you focus on. It’s a new era.
            </p>

            <div className={styles.mediaTall} data-reveal-img>
              <Picture slug="studio-portrait" sizes="(max-width: 860px) 50vw, 30vw" position="50% 30%" />
            </div>
            <div className={styles.mediaWide} data-reveal-img>
              <Picture slug="studio-lunge" sizes="(max-width: 860px) 100vw, 62vw" position="40% 50%" />
            </div>

            <ul className={styles.themes}>
              {THEMES.map((theme) => (
                <li key={theme.title} className={styles.theme} data-reveal>
                  <h3 className={`display ${styles.h3}`}>{theme.title}</h3>
                  <p>{theme.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Full-bleed image */}
        <div className={styles.band} data-reveal-img>
          <Picture slug="studio-swan" sizes="100vw" position="45% 45%" />
        </div>

        {/* Packages */}
        <section id="packages" className={styles.packages} aria-labelledby="packages-title">
          <div className={`wrap grid ${styles.packagesGrid}`}>
            <div className={`${styles.packagesHead} ${styles.colHead}`}>
              <h2 id="packages-title" className={`display ${styles.h2}`} data-reveal>
                Packages
              </h2>
              <p className={styles.note} data-reveal>
                Prices in Indonesian rupiah. Packages are sold through Momence, where validity and full
                terms are shown before checkout.
              </p>
            </div>

            <div className={`${styles.groups} ${styles.colBody}`}>
              {packageGroups.map((group) => (
                <div key={group.title} data-reveal>
                  <h3 className={styles.label}>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => {
                      const href = packageUrl(item.id);
                      return (
                        <li key={item.id} className={styles.row}>
                          <span className={`display ${styles.rowName}`}>{item.name}</span>
                          <span className={styles.rowDetail}>{item.detail}</span>
                          <span className={styles.rowPrice}>{formatIdr(item.price)}</span>
                          {href ? (
                            <a
                              href={href}
                              {...externalLinkProps}
                              data-checkout={item.name}
                              className={`btn btn-sm ${styles.rowAction}`}
                            >
                              Buy<span className="sr-only"> {item.name}</span>
                            </a>
                          ) : (
                            <span className={`${styles.rowAction} ${styles.rowUnavailable}`}>
                              Not available online
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Book: Momence booking board embedded on the page */}
        <section id="book" className={styles.book} aria-labelledby="book-title">
          <div className={`wrap grid ${styles.bookGrid}`}>
            <div className={`${styles.bookHead} ${styles.colHead}`}>
              <h2 id="book-title" className={`display ${styles.h2}`} data-reveal>
                Book a class
              </h2>
              <p className={styles.note} data-reveal>
                View availability and book a 45 min reformer session. Have a pack or subscription? Sign in
                inside the booking panel.
              </p>
              <p className={styles.note} data-reveal>
                Booking is handled securely by Momence.{" "}
                <a href={BOOKING_URL} {...externalLinkProps} className="link">
                  Open in a new tab
                </a>
              </p>
            </div>
            <div className={`${styles.bookFrame} ${styles.colBody}`}>
              <BookingFrame src={BOOKING_URL} title="Book a class with ERA Pilates on Momence" />
            </div>
          </div>
        </section>

        {/* Visit */}
        <section id="visit" className={styles.visit} aria-labelledby="visit-title">
          <div className={`wrap grid ${styles.visitGrid}`}>
            <div className={styles.visitMedia} data-reveal-img>
              <Picture slug="studio-straps" sizes="(max-width: 860px) 100vw, 30vw" position="50% 35%" />
            </div>
            <div className={`${styles.visitCopy} ${styles.colBody}`}>
              <div data-reveal>
                <h2 id="visit-title" className={`display ${styles.h2}`}>
                  Visit ERA
                </h2>
                <p className={styles.visitIntro}>
                  Walk in or book ahead. Find us in Bingin, and follow the studio on Instagram.
                </p>
              </div>
              <div data-reveal>
                <dl className={styles.facts}>
                  <div>
                    <dt className={styles.label}>Studio</dt>
                    <dd>{site.location}</dd>
                  </div>
                  <div>
                    <dt className={styles.label}>Open</dt>
                    <dd>{site.hours}</dd>
                  </div>
                  <div>
                    <dt className={styles.label}>Booking</dt>
                    <dd>Online through Momence, or walk in</dd>
                  </div>
                  <div>
                    <dt className={styles.label}>Instagram</dt>
                    <dd>
                      <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="link">
                        {site.instagram.handle}
                      </a>
                    </dd>
                  </div>
                </dl>
                <div className={styles.actions}>
                  <a href={BOOK_ANCHOR} className="btn">
                    Book a class
                  </a>
                  <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    Instagram
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`wrap grid ${styles.footerGrid}`}>
          <a href="#top" className={`display ${styles.footerMark}`} aria-label="ERA, back to top">
            ERA
          </a>
          <nav aria-label="Footer" className={styles.footerNav}>
            <ul>
              <li>
                <a href="#studio">Studio</a>
              </li>
              <li>
                <a href="#packages">Packages</a>
              </li>
              <li>
                <a href="#visit">Visit</a>
              </li>
              <li>
                <a href={BOOK_ANCHOR}>Book a class</a>
              </li>
              <li>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
                  Instagram<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </nav>
          <p className={styles.footerSmall}>
            © {new Date().getFullYear()} {site.name}. Bookings and payments are handled by Momence.
          </p>
        </div>
      </footer>
      <CheckoutDialog />
      <FooterHeight />
    </>
  );
}
