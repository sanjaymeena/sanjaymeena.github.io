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

      <h3><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h3>

      <div class="entry">
        {{ post.content | strip_html | truncatewords: 50 }}
      </div>
      
    </article>
     {% endif %}
  {% endfor %}
</div>

