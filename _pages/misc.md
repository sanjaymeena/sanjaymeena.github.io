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
  <h3>This year's posts</h3>
  {%for post in site.categories.misc %}
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


