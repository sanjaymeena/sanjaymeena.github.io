---
layout: single
title: Tech Posts
author_profile: true
permalink: /tech/
header:
  overlay_image: machine-learning.jpg
---



<div class="page_list">
  {% for post in site.categories.Tech %}
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

