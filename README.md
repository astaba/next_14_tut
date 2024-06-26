# Next JS 14

In Next JS all React components are server components by default unless initiated with the `"use client"` top directive. Since hooks can only be used in client component make sure start them with that directive.

## File convention

```bash
 app/
 ├── layout.tsx
 ├── template.tsx
 ├── error.tsx
 ├── loading.tsx
 ├── not-found.tsx
 └── page.tsx
```

```tsx
<Layout>
  <Template>
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<NotFound />}>
          <Page />
        </ErrorBoundary>
      </Suspense>
    </ErrorBoundary>
  </Template>
</Layout>
```

## Routing

### The app router

While the `app` folder is mapped to the **url domaine name** every subfolder ending up with a `page.tsx` file, is mapped to **url path.** _Example:_ `project/src/app/about/page.tsx` is mapped to `domaineName/about`

### Dynamic routes

Dynamic routes are created by wrapping square brackets around a url segment (`app/[productID]/reviews/[reviewID]/page.tsx`). To retreive those segments Within the subcomponents use the `param prop`, an object with a property for each segment:

```tsx
export default function Review({
  params,
}: {
  params: { productId: string; reviewId: string };
}) {
  return (
    <h1>
      Review {params.reviewId} of product {params.productId}
    </h1>
  );
}
```

### Catch all segment

To route to a ramdomly named segment mapping to anything use `[[...anyName]]`. _Example:_ `project/src/app/docs/[[...slug]]/page.tsx`

```tsx
export default function Docs({ params }: { params: { slug: string[] } }) {
  // You can taylor page content according to route
  const content = (function () {
    if (params.slug) {
      switch (params.slug.length) {
        case 1:
          return `Viewing docs for features ${params.slug[0]}`;
        case 2:
          return `Viewing docs for features ${params.slug[0]} and concept ${params.slug[1]}`;
      }
    } else {
      // Or return a default content in case of no ramdom segment
      return "Docs home page";
    }
  })();

  return <h1>{content}</h1>;
}
```

### Not found page

It can be customized by providing each route with a `not-found` file. Or loaded programmatically from within a route with the function:

```tsx
import { notFound } from "next/navigation";
```

For example: within a dynamic route the value of the dynamic segment doesn't match any available resource. Instead of letting the `error` fire (if any) calling the local `not-found` improve user experience.

### File colocation

It is perfectly ok to save component file next to reserved-named file within a same route folder. Next JS won't map them to any route. However it is better to keep them in some `component` folder next to the `app` folder.

### Private folders

when you need to prevent Next JS from routing a folder just prefixe it with **underscore `_`**. However if you need a route to start with underscore you have to prefixe it with the encode version of it as `%F5`.

| **app subfloder** | **url entered** | **http status** |
| ----------------- | --------------- | --------------- |
| `/_lib`           | host/\_lib      | **404**         |
| `/%F5lib`         | host/\_lib      | **200**         |

### Route group

To enhance **DX** sometimes you need to group some specific folders within the same directory while keeping this directory out of url mapping by naming it `(directory)`. _Example:_

| **app subfloder**  | **url**       |
| ------------------ | ------------- |
| `/(auth)/login`    | host/login    |
| `/(auth)/register` | host/register |

### Prallel routes

**Why?**  
Using components composition it is possible to render a UI made up of multiple different component. However, in case some of these components have navigable alternate UI, neither it would possible to access while keeping unchanged the surrounding other components and, nor would the sub-component sub-url be sharable.

**How?**

- Parallel routes are created using named **slots**. Slots are defined with the `@folder` convention. For example, the following file structure defines two slots: `@analytics` and `@team`:

```bash
 app
  ├──@analytics
  │   └── page.tsx
  ├──@team
  │   └── page.tsx
  ├── layout.tsx
  └── page.tsx
```

- Slots are passed as `props` to the shared parent **layout**. For the example above, the component in `app/layout.js` now accepts the `@analytics` and `@team` slots `props,` and can render them in parallel alongside the children `prop`:

```tsx
export default function Layout({
  children,
  team,
  analytics,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <>
      {children}
      {team}
      {analytics}
    </>
  );
}
```

- However, slots are not route segments and do not affect the URL structure. For example, for `/@analytics/views`, the URL will be **/views** since `@analytics` is a slot.

> **Good to know:**  
> The `children` prop is an implicit slot that does not need to be mapped to a folder. This means `app/page.js` is equivalent to `app/@children/page.js`.

**Benefits:**

- Ability to **split a single layout into various slots**, making the code more manageable.
- **Independent route** handling.  
  Parallel Routes can be streamed independently, allowing you to define independent `error` and `loading` states for each route
- **Sub-navigation.**  
  Each slop of your dashboard can essentially function as a mini-application, complete with its own navigation and state management.

#### Unmatched routes

By default, Next.js keeps track of the active state (or subpage) for each slot. However, the content rendered within a slot will depend on the type of navigation:

- **Soft Navigation:** During client-side navigation, Next.js will perform a partial render, changing the subpage within the slot, while maintaining the other slot's active subpages, even if they don't match the current URL.
- **Hard Navigation:** After a full-page load (browser refresh), Next.js cannot determine the active state for the slots that don't match the current URL, as soon as those **slots are destructured from the `layout prop`**. Instead, it will **render a `default.js` file for each the unmatched slots**, or **404 if only one `default.js` is missing,** including the `children`'s one.
- The `default.js` file can mirror the `page.js` or **be completely different.**

> **Good to know:**  
> The 404 for unmatched routes helps ensure that you don't accidentally render a parallel route on a page that it was not intended for.

#### Conditional rendering

Leveraging the `layout` file and its `slot` props you can use **parallel routes** to conditionally render some routes.

### Intercepting routes

**Why?**  
Intercepting routes allows you to load a route from another part of your application within the current layout (via its `page`). However, when navigating to that route by clicking a shared URL or by refreshing the page, the authentic `page` from that route should render instead of the the intercept folder `page`.

**How?**  
Intercepting routes can be defined with the `(..)` convention, which is similar to relative path convention `../` but for segments:

- `(.)` to match segments on the same level
- `(..)` to match segments one level above
- `(..)(..)` to match segments two levels above (**partially broken**)
- `(...)` to match segments from the root app directory

> **Good to know:**  
> Note that the `(..)` convention is based on route segments, not the file-system.

**Example:**

```bash
app  #-----------------------  1
├── feed  #------------------  2
│   ├── (..)photo  #---------  3
│   │   └── [id]  #----------  4
│   │       └── page.tsx  #--  5
│   ├── layout.tsx  #--------  6
│   └── page.tsx  #----------  7
├── photo  #-----------------  8
│   └── [id]  #--------------  9
│       └── page.tsx  #------ 10
├── layout.tsx  #------------ 11
└── page.tsx  #-------------- 12
```

While connected to `/feed` route, and having **line #7 UI** displayed you have a link to (among other `id`) `/photo/23` route but don't want to display **line #10 UI.** To do that, you can **intercept** that route with **line #3 (..)photo** and display whatever you wish with **line #4 and #5.**

The very UI from **line #10** will be displayed only if you share `/photo/23` url (**which is among the purposes behind intercept route**) or if you refresh **line #5 UI.**

#### Modal

**Parallel Routes** can be used together with **Intercepting Routes** to create modals. This allows you to solve common challenges when building modals, such as:

- Making the modal content shareable through a URL.
- Preserving context when the page is refreshed, instead of closing the modal.
- Closing the modal on backwards navigation rather than going to the previous route.
- Reopening the modal on forwards navigation.

## Layout

To apply consistent layout to a route and all its subroutes use the `layout` file, which receive as `children React.node` the `page` file or all sub routes.

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        // Enhance UI as you wish
        {children}
        // Enhance UI as you wish
      </body>
    </html>
  );
}
```

The `RootLayout` component is automatically generated by Next JS even if you delete it.

### Nested layout

When you want to apply a specific layout to a route. In the following example the `RootLayout` will aplly to all project before any **sub layout** is included.

```bash
app/
├── products
│   ├── [productId]
│   │   ├── layout.tsx # nested layout
│   │   ├── page.tsx
│   │   └── reviews
│   │       └── [reviewId]
│   │           └── page.tsx
│   └── page.tsx
├── layout.tsx
├── not-found.tsx
└── page.tsx
```

| **url**      | **`RootLayout {children}`** | **final UI**                                                           |
| ------------ | --------------------------- | ---------------------------------------------------------------------- |
| /            | `/page`                     | home page                                                              |
| /products    | `/producs/page`             | products page                                                          |
| /about       | `/about/page`               | about page                                                             |
| /products/12 | `/products/12/layout`       | product 12 page (**Since it's in turn `this nested layout children`**) |

### Route group layout

When you need to apply a layouyt some route segments excluding some other segments at the same level use route groupe.

```bash
app/(auth)/
├── (with-auth-layout) # route group to restrict layout
│   ├── layout.tsx # route group layout
│   ├── login
│   │   └── page.tsx
│   └── register
│       └── page.tsx
└── forgot-password
    └── page.tsx
```

While `/login` and `/register` url will have some common UI from `/app/(auth)/(with-ayth-layout)/layout.tsx` file, `/forgot-password` url won't have it.

### Templates

**Why?**  
Unlike layouts that persist across routes and maintain state, templates create a new instance for each of their children on navigation. This means that when a user navigates between routes that share a template, a new instance of the child is mounted, DOM elements are recreated, state is not preserved in Client Components, and effects are re-synchronized. Useful in those cases:

- To resynchronize `useEffect` on navigation.
- To reset the state of a child Client Components on navigation.

**How?**  
A template can be defined by exporting a default React component from a `template.js` file. The component should accept a children prop.

**Where?**

```bash
 app
 ├── layout.tsx
 ├── template.tsx
 └── page.tsx
```

In terms of nesting, `template.js` is rendered between a layout and its children. Here's a simplified output:

```tsx
<Layout>
  {/* Note that the template is given a unique key. */}
  <Template key={routeParam}>{children}</Template>
</Layout>
```

## Metadata and SEO

For SEO optimization, Next JS introduce the **Metadata API** to taylor metadata for each page. For this either:

- export a **static `metadata` object** or
- export a **dynamic `generateMetadata` function** that returns an **object with metadata as properties.**

For example defining the two following codes respectively in two different components, will overwrite the default **page `title`** from the `RootLayout` component `metadata` object.

```tsx
// in app/about/page.tsx
export const metadata = {
  title: "About Codevolution",
};
// in app/produtcs/[productID]/page.tsx
import { Metadata } from "next";

export const generateMetadata = ({ params }: ProductProps): Metadata => {
  return {
    title: `Product ${params.productId}`,
  };
};
```

### Title metadata

Its can either a `string` or an `object`. In the following directory as example:

```bash
app/
├── layout.tsx
├── not-found.tsx
├── page.tsx
├── about
│   └── page.tsx
├── blog
│   └── page.tsx
└── products
    ├── [productId]
    │   ├── layout.tsx
    │   └── page.tsx
    └── page.tsx
```

Starting from the `RootLayout` component, the following code will default the title of any route with metadata export to **"Next.js - Codevolution"**:

```tsx
// RootLayout component
export const metadata: Metadata = {
  title: {
    // absolute: "",
    template: "%s | Codevolution",
    default: "Next.js - Codevolution",
  },
  description: "Generated by Next.js",
};
```

Sub route exporting metadata as `string`, will have it substitute with the **`"%s"`** string from the parent route and assigned the title of the resulting **title template property.**

```tsx
// app/blog/page.tsx
export const metadata: Metadata = {
  title: "Blog",
};
// page title => "Blog | Codevolution"
```

For sub route to overwrite that default title or template, they must either, export `metadata` as an object with an `absolute` property:

```tsx
// app/about/page.tsx
export const metadata: Metadata = {
  title: {
    absolute: "About Codevolution",
  },
};
// page title => "About Codevolution"
```

or export the `generateMetadata` function (optionally asynchronous) returning the very object.

```tsx
// file: app/products/[productId]/page.tsx
// url: host/products/12
export const generateMetadata = async ({
  params,
}: ProductProps): Promise<Metadata> => {
  const productName = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Samsung ${params.productId}`);
    }, 200);
  });

  return {
    title: {
      absolute: `Product ${productName}`,
    },
  };
};
// page title => "Product Samsung 12"
```

## Navigation

Navigation is simply achieved by using the Next JS `Link` component the extends the HTML anchor `<a></a>` element:

```tsx
// import
import Link from "next/link";
// use
<Link href={"/"}>Home</Link>
// or replace in history current directory
<Link href={"/about"} replace>Home</Link>
```

### Active link with `usePathname`

To detect **active links,** Next JS provide the `usePathname` destructured from `"next/navigation"`, and better **to invoque from within a layout component.**
Use it or some of its method to style active links accordingly:

```tsx
"use client";
import { usePathname } from "next/navigation";
// within client component
const pathName = usePathname();
// within Link className prop apply conditional style with
pathName === "/about"; // or
pathName.startsWith("/about");
```

### Programmatic navigation with `useRouter`

```tsx
"use client";
import { useRouter } from "next/navigation";
// within client component
const router = useRouter();
// within some callback function internal to the component
router.push("/"); // or .replace("/") or .forward() and so on
```

## Loading UI and Streaming

The special file `loading.js` helps you create from the server meaningful Loading UI with **React Suspense**.

**Where?**

```bash
 app
 ├── layout.tsx
 └── dashboard
     ├── layout.tsx
     ├── loading.tsx
     └── page.tsx
```

**How?**

```tsx
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <LoadingSkeleton />;
}
```

In the same folder, `loading.js` will be nested inside `layout.js`. It will automatically wrap the `page.js` file and any children below in a `<Suspense>` boundary.

```tsx
// Component hierarchy
// Where Suspense is Layout {children}
<Layout>
  <Header />
  <SideNav />
  <Suspense fallback={<Loading />}>
    <Page />
  </Suspense>
  <Footer />
</Layout>
```

**Recommendation:** Use the `loading.js` convention for route segments (layouts and pages) as Next.js optimizes this functionality.

## Error Handling

In case of error within `page` files without error boundary, the entire application breaks, and worse, _**in production**_ it happens without any hint for the user which is a very bad UX.

It is a waste to allow a deeply nested component to break an entire application. To solve this, create an error UI component in an `error` file next to the `page` around which you need Next JS to implement an `ErrorBoundary`. Now error bubbling is catch and a nice UI is rendered.

```tsx
"use client";
export default function ErrorBoundary() {
  return <h3>Error occured in rewieId</h3>;
}
```

You can even display the specific error message.

```tsx
"use client";
export default function ErrorBoundary({ error }: { error: Error }) {
  return <h3>{error.message}</h3>;
}
```

### Recovering from errors

Use `reset`, an prop from the `error` instance, to reset the error boundary. When executed, the function will try to re-render the Error boundary's contents. If successful, the fallback error component is replaced with the result of the re-render.

Can be used to prompt the user to attempt to recover from the error.

> **Good to know:**
>
> - error.js boundaries **must be Client Components**, hence the `page` component too.
> - In Production builds, errors forwarded from Server Components will be stripped of specific error details to avoid leaking sensitive information.
> - An `error.js` boundary will not handle errors thrown in a `layout.js` component in the same segment because the error boundary is nested inside that layouts component.
> - To handle errors for a specific layout, place an `error.js` file in the layouts parent segment.
> - To handle errors within the root layout or template, use a variation of error.js called `app/global-error.js`.
