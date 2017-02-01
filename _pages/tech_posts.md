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
  {%for post in site.categories.Tech %}
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

  </ul>
</div>
