import type { UIStrings } from "../types";

// This file holds the English translations used for the KO/EN client-side toggle.
// The default language (Korean) lives in en.ts since Astro's single-locale setup uses "en".
export default {
  nav: {
    home: "Home",
    posts: "Posts",
    tags: "Tags",
    projects: "Projects",
    about: "About",
    resume: "Resume",
    archives: "Archives",
    search: "Search",
  },
  post: {
    publishedAt: "Published at",
    updatedAt: "Updated",
    sharePostIntro: "Share this post:",
    sharePostOn: "Share on {{platform}}",
    sharePostViaEmail: "Share via email",
    tagLabel: "Tags",
    backToTop: "Back to top",
    goBack: "Go back",
    editPage: "Edit page",
    previousPost: "Previous Post",
    nextPost: "Next Post",
  },
  pagination: {
    prev: "Prev",
    next: "Next",
    page: "Page",
  },
  home: {
    socialLinks: "Social Links",
    featured: "Featured",
    recentPosts: "Recent Posts",
    allPosts: "All Posts",
  },
  footer: {
    copyright: "Copyright",
    allRightsReserved: "All rights reserved.",
  },
  pages: {
    tagTitle: "Tag",
    tagDesc: "All the articles with the tag",
    tagsTitle: "Tags",
    tagsDesc: "All the tags used in posts.",
    postsTitle: "Posts",
    postsDesc: "All the articles I've posted.",
    archivesTitle: "Archives",
    archivesDesc: "All the articles I've archived.",
    searchTitle: "Search",
    searchDesc: "Search any article ...",
  },
  a11y: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    toggleTheme: "Toggle theme",
    searchPlaceholder: "Search posts...",
    noResults: "No results found",
    goToPreviousPage: "Go to previous page",
    goToNextPage: "Go to next page",
  },
  notFound: {
    title: "404 Not Found",
    message: "Page Not Found",
    goHome: "Go back home",
  },
} satisfies UIStrings;
