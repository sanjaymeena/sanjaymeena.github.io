---
layout: single
title: Book Notes
permalink: /book_notes/
header:
  overlay_image: book-notes.jpg
---

<div class="page_list">
  {% for post in site.categories.Books %}
   {% if post.url %}
    <article class="page_list">

      <h3><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h3>

      <div class="entry">
        {{ post.excerpt }}
      </div>
      
    </article>
     {% endif %}
  {% endfor %}
</div>

