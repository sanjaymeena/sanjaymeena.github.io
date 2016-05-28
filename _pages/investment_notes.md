---
title: Investment Notes
permalink: /investment_notes/
layout: page
sitemap: true 
---


<div class="page_list">
  {% for post in site.categories.investment_notes %}
   {% if post.url %}
    <article class="page_list">
      <h4><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h4>
     
      {{ post.excerpt }} 
    </article>
     {% endif %}
  {% endfor %}
</div>

