import Link from "next/link"

export function Layout({ children }) {
  return (
    <>
      <div className="max-w-screen-md px-6 mx-auto">
        <header>
          <div className="container flex items-center justify-between py-6 mx-auto">
            <Link href="/" className="text-2xl font-semibold no-underline">
              Node.
            </Link>
            <p className="font-semibold text-sm">We make Drupal happen.</p>
          </div>
        </header>
        <main className="container py-10 mx-auto">{children}</main>
      </div>
    </>
  )
}
