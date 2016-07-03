---
title: Miscellaneous Posts
permalink: /misc/
description: This section is for the Misc posts related to food, travel etc.
keywords: Food, Travel
excerpt:  Misc posts related to food, travel etc.

description: Section for value investing, financial analysis
keywords: value investing, pharma, stocks, financial analysis
excerpt: Value Investing related posts
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

