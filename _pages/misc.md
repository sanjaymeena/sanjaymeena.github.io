---
title: Miscellaneous Notes
permalink: /misc/

---


<div class="page_list">
  {% for post in site.categories.misc %}
   {% if post.url %}
    <article class="page_list">
      <h3><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h3>
     {{ post.excerpt }}
     
    </article>
     {% endif %}
  {% endfor %}
</div>

