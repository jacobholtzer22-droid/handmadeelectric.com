import type { JsonLdNode } from "@/lib/schema";

/**
 * Renders JSON-LD safely. `<` is escaped to < so a value can never break
 * out of the script element. Server component, so the markup is present in the
 * initial HTML with zero JavaScript executed, which is what crawlers read.
 */
export default function JsonLd({ nodes }: { nodes: JsonLdNode[] }) {
  return (
    <>
      {nodes.map((node, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(node).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
