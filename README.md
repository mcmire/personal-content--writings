# Writings

This repo holds content for my personal site which may take the form of a blog post, article, or the like. The files here live separately from the actual site where they will be viewed so that the site itself can be changed or even reconstructed without affecting the history of the content.

Although I intend to keep these files as agnostic of the technology that will be used to render them as possible, there are some concessions I've had to make:

1. Text files are written in a superset of Markdown. In most cases this is GitHub Flavored Markdown with support for directives as defined by the [CommonMark directives proposal](https://talk.commonmark.org/t/generic-directives-plugins-syntax/444), but in cases where I want to feature interactive sections, I've opted to use MDX. Therefore, I am assuming the site supports these type of directives as well as MDX.
2. Where I need custom styling, I've opted to use Tailwind. Therefore, I am assuming that the site supports Tailwind.
