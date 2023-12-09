export default function Docs({ params }: { params: { slug: string[] } }) {
  const content = (function () {
    if (params.slug) {
      switch (params.slug.length) {
        case 1:
          return `Viewing docs for features ${params.slug[0]}`;
        case 2:
          return `Viewing docs for features ${params.slug[0]} and concept ${params.slug[1]}`;
      }
    } else {
      return "Docs home page";
    }
  })();

  return <h1>{content}</h1>;
}
