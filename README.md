In Next.js:

    Files in the app directory (e.g., layout.tsx, page.tsx) follow a nested routing structure.
    The layout.tsx file wraps any corresponding page.tsx file (and other child routes) within its defined layout structure.

How page.tsx is a Child of layout.tsx

In the app directory:

    layout.tsx defines the layout for the folder it resides in (and its children).
    page.tsx represents the main page content for the folder it resides in.
    When you navigate to the corresponding route (e.g., / for app/page.tsx), Next.js automatically:
        Renders the layout (layout.tsx) first.
        Injects the page.tsx content as the children prop into the layout.tsx file


Login Button:

    A button calls signIn('github') to log in using GitHub as the provider.
    The argument 'github' specifies that GitHub is the OAuth provider being used for authentication.


Steps Explained:
a. Creating providers.tsx:

    What we did:
    Created a dedicated Providers component to encapsulate SessionProvider.

    Why we did it:
    In Next.js 13+ (with the new app directory structure), SessionProvider must only be used on the client side because it relies on React Context, which isn’t supported on the server side. Adding "use client" ensures this file runs only on the client side.

b. Updating layout.tsx:

    What we did:
    We wrapped the entire app's content (Navbar and children) in the Providers component.

    Why we did it:
    The layout.tsx file defines the root layout of your app. By including the Providers here, we ensured that the session context from SessionProvider is available throughout the app (to both the Navbar and any child components/pages).