---
title: Investment Notes
permalink: /investment_notes/
header:
  overlay_image: finance.jpg

description: Section for value investing, financial analysis
keywords: value investing, pharma, stocks, financial analysis
excerpt: Value Investing related posts
---


<div class="page_list">
  {% for post in site.categories.Investing %}
   {% if post.url %}
    <article class="page_list">
      <h3><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h3>
     {{ post.excerpt }}
     
    </article>
     {% endif %}
  {% endfor %}
</div>

