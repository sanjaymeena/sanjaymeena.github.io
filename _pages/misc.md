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
  {%for post in site.categories.Misc %}
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

</div>


