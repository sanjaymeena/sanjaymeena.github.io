---
title: Tech Demos
permalink: /demos/
description: This section is for the demos and source code related to NLP, Data Science and Machine Learning.
keywords: Natural Language Processing, NLP, Data Science, machine learning, deep learning
excerpt: Demos and source code related to NLP, Data Science and Machine Learning.
 
header:
  overlay_image: demos.jpg
---




### Natural Language Processing (NLP) Related 
<table class="table table-hover">
  <thead>
    <tr>
     
      <th><h4> Demo </h4></th>
      <th><h4>Description </h4></th>
    </tr>
  </thead>
  <tbody>

{% for post in site.categories.demos %}
{% if post.tags contains 'nlp' %}
<tr> 
<td><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a> </td>   
<td>{{post.excerpt}} </td>   
</tr>  

{% endif %}
{% endfor %}

<tr> 
<td><a href="{{ site.baseurl }}/tech/javascript/text_analyzer_google_chrome_extension/">Text Analyzer - Google Chrome Extension</a> </td>   
<td>Text Analyzer Extension can provide grammatical and semantic information for the selected text in English directly in Google chrome browser</td>   
</tr>  

  </tbody>
</table>



### Other Projects

<table class="table table-hover">
  <thead>
    <tr>
     
      <th><h4> Demo </h4></th>
      <th><h4>Description </h4></th>
    </tr>
  </thead>
  <tbody>


<tr> 
<td><a href="https://sanjaymeena.shinyapps.io/compound_interest_calculator/">Compound Interest Calculator</a> </td>   
<td>Compound intereste calculator made using <a href="https://www.r-project.org/">R</a> and <a href="http://shiny.rstudio.com/">Shiny</a>, Web Application Framework for R. You can read a small report <a href="https://github.com/sanjaymeena/developing-data-products/blob/master/slides/compound_interest_shiny_presentation.md"><b>here</b></a></td>   
</tr>  



  </tbody>
</table>

### Data Science Related 

<table class="table table-hover">
  <thead>
    <tr>
     
      <th><h4> Links </h4></th>
      <th><h4>Description </h4></th>
    </tr>
  </thead>
  <tbody>


<tr> 
<td><a href="https://rpubs.com/sanjaymeena">Data Science related analysis using R</a> </td>   
<td>Projects and tasks related to <a href="https://zh-tw.coursera.org/learn/data-scientists-tools">The Data Scientist’s Toolbox</a> </td>   
</tr>  
  </tbody>
</table>
