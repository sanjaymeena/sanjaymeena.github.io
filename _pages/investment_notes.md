---
title: Investment Notes
permalink: /investment_notes/
layout: page
sitemap: true 
---


<div class="page_list">
  {% for post in site.categories.investments %}
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

