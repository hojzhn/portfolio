import React from "react";

/**
 * ArticleColophon
 *
 * Small page-bottom marginalia. Faded by default, gains a touch of
 * presence on hover. Designed to sit below a thin divider at the end
 * of a long-form article. Works in any palette that defines --txt3,
 * --txt2, --bg3, and --point.
 *
 * Props:
 *   email     required. The address the mailto: opens.
 *   name      optional. Your name, shown after the year.
 *   year      optional. Defaults to the current year.
 *   note      optional. The short line before the email link.
 *             Defaults to a calm, non-needy prompt.
 */
export default function ArticleColophon({
  email = "xbajta@gmail.com",
  name = "Savvy Ahn",
  year = new Date().getFullYear(),
  note = "Found a typo?",
}) {
  return (
    <footer
      style={{
        marginTop: 96,
        paddingTop: 24,
        fontFamily: "'JetBrains Mono', ui-monospace, Menlo, monospace",
        fontSize: 11,
        letterSpacing: "0.06em",
        color: "var(--txt3)",
        textAlign: "center",
        lineHeight: 1.8,
      }}
    >
      <div>
        {note}{" "}
        <a
          href={`mailto:${email}`}
          style={{
            color: "var(--txt2)",
            textDecoration: "none",
            paddingBottom: 1,
            transition: "color 120ms ease, border-color 120ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--point)";
            e.currentTarget.style.borderBottomColor = "var(--point)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--txt2)";
            e.currentTarget.style.borderBottomColor = "var(--bg3)";
          }}
        >
          {email}
        </a>
      </div>
      <div style={{ marginTop: 4 }}>{name ? `${name}, ${year}` : year}</div>
    </footer>
  );
}
