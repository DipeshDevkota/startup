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