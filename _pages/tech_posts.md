---
layout: single
title: Tech Posts
author_profile: true
permalink: /tech/
header:
  overlay_image: machine-learning.jpg
  
description: Posts related to Natural Language Processing, Data Science ,Deep Learning , Programming
keywords: NLP, natural language processing, deep learning, machine learning, technology
excerpt: Posts related to Natural Language Processing, Data Science, Machine Learning and Programming
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

