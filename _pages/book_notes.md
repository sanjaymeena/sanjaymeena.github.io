---
title: Book Notes
permalink: /book_notes/

header:
  overlay_image: book-notes.jpg
description: This section is for the book notes i made  on books from various disciplines of value investing, psychology etc.
keywords: value investing, behavioural finance, psychology
excerpt: This section is for the book notes i made  on books from various disciplines of value investing, psychology etc.
  
---
<div class="page_list">
  {%for post in site.categories.Books %}
     {% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}

  {% if forloop.first %}
  <h2 id="{{ this_year }}-ref">{{this_year}}</h2>
  <ul class="posts">
  {% else %}
      {% if this_year != last_year %}
      </ul>
      <h2 id="{{ this_year }}-ref">{{this_year}}</h2>
      <ul class="posts">
      {% endif %}
  {% endif %}

       <li><h4><time>{{ post.date | date:"%d %b" }} </time><a href="{{ site.baseurl }}{{ post.url }}"> - <b> {{ post.title }} </b></a></h4>
      <ul>
      <li> {{ post.excerpt }}</li>
      </ul>   
      </li>

  {% if forloop.last %}
    </ul>
  {% endif %}

  {% capture last_year %}{{ this_year }}{% endcapture %}
{% endfor %}

  
</div>




