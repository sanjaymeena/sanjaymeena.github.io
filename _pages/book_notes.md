---
layout: single
title: Book Notes
permalink: /book_notes/

header:
  overlay_image: book-notes.jpg
description: This section is for the book notes i made  on books from various disciplines of value investing, psychology etc.
keywords: value investing, behavioural finance, psychology
excerpt: This section is for the book notes i made  on books from various disciplines of value investing, psychology etc.
  
---

<div class="page_list">
    <h3>This year's posts : </h3>
  {%for post in site.categories.Books %}
    {% unless post.next %}
      <ul class="this">
    {% else %}
      {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
      {% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
      {% if year != nyear %}
        </ul>
        <h3>{{ post.date | date: '%Y' }}</h3>
        <ul class="past">
      {% endif %}
    {% endunless %}
      <li><h4><time>{{ post.date | date:"%d %b" }} </time><a href="{{ site.baseurl }}{{ post.url }}"> - <b> {{ post.title }} </b></a></h4>
      <ul>
      <li> {{ post.excerpt }}</li>
      </ul>   
      </li>

  {% endfor %}
  </ul>
</div>


