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
  <h3>This year's posts</h3>
  {%for post in site.categories.Tech %}
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


