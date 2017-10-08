---
title: Tech Projects and Demos
permalink: /projects/
description: This section is for the projects related to NLP, Data Science, Machine Learing, Deep Learning
keywords: Natural Language Processing, NLP, Data Science, machine learning, deep learning
excerpt: Demos and source code related to NLP, Data Science and Machine Learning.
layout: customjs
header:
  overlay_image: demos.jpg
---
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

<script type="text/javascript" src="{{ site.baseurl }}/assets/js1/jquery.dataTables.min.js"></script>




<style type="text/css">
#datascience {
   
    
    font-size: .90em; /* Increase font-size */
    line-height: 2;

}

#corenlp {
   
    
    font-size: 15px; /* Increase font-size */
    line-height: 2;
}
</style>
   
<script>
$(document).ready(function(){


   $('#datascience').DataTable( {
        language: {
        search: "_INPUT_",    
        searchPlaceholder: "Search by words ...",
        
    },
        paging: false,
        searching: true,
        "order": [[ 4, "desc" ]]
     }
        );


  $('#corenlp').DataTable( {
        language: {
        search: "_INPUT_",    
        searchPlaceholder: "Search by words ..."
    },
        paging: false,
        searching: true,
        "order": [[ 4, "desc" ]]
     }
        );  

});
</script>

## Data Science, Natural Language Processing (NLP) Projects 

These use Machine Learning, Deep Learning , Data Science knowledge and are connected to the Natural Language Processing (NLP) topics in some way. Most techniques are transferable to other topics as Deep Learning, Machine Learning techniques can be applied across different topics.

I have divided the projects into 

1. Data Science Projects - Involving usage of Python, R. Many of these are related to NLP. 
2. Core NLP Projects - Java based for core NLP topics



* <b>Note: The tables are searchable by words and columns can be sorted by clicking on the column names</b>





### Data Science Projects

<table id='datascience' class='table table-bordered' >
  <thead>
    <tr>

      <th><h4>Area</h4></th>
      <th><h4>Description </h4></th>
      <th><h4>Keywords </h4></th>
      <th><h4>Links </h4></th>
      <th><h4>Year </h4></th>
    </tr>
  </thead>
  <tbody>


<tr>
<td>Data Science, Deep Learning, NLP</td>   
<td>Deep Learning based Spam Filter on Enron+ Spam Assassin public dataset and comparison with SVM, Random Forest, Xgboost models</td>  
<td><font color="brown">Topics : </font>Deep Learning, NLP, Machine Learning, TF-IDF, Random Forest, Xgboost, SVM<br> <font color="brown">Development : </font> Python, Tensorflow, Numpy, Pandas, Scikit</td>
<td> <a href="{{ site.baseurl }}/tech/spam_deep_learning/">Report </a>  <br> <a href="https://github.com/sanjaymeena/Deep-Learning-based-Spam-Filter">Code </a>  </td> 
<td>2017</td> 
</tr>  

<tr> 
<td>Data Science, Deep Learning, NLP</td>   
<td>Semantic Role Labeling (SRL) system using Deep Learning - Bidirectional LSTM network in Paddle Framework
</td>  
<td>
 <font color="brown">Topics : </font>NLP, Deep Learning<br> <font color="brown">Development : </font> Python, Paddle, Numpy, Scikit
</td>
<td> 
<a href="{{ site.baseurl }}/tech/semantic_role_labeling/">Report </a>  <br>
<a href="https://github.com/sanjaymeena/semantic_role_labeling_deep_learning">Code </a>
</td> 
<td>2017</td> 
</tr> 


<tr>
<td>Unsupervised Clustering for text</td>   
<td>Implementations of few clustering algorithms for text and some tests on subset of dataset of Wikipedia pages.
<ul>
<li> Nearest Neighbour Search </li>
<li> K-means, Kmeans++</li>
<li> Latent Dirichlet Allocation (Mixed membership Modeling ) for Text Data </li>
</ul>

 </td>  
<td><font color="brown">Topics : </font>Machine Learning, K-means, Kmeans++, Nearest Neighbour Search, LDA<br> <font color="brown">Development : </font> Python, Numpy, Graphlab </td>
<td> <a href="https://github.com/sanjaymeena/UnsupervisedClusteringAlgorithms">Code </a> <br>
<font color="brown">Reports : </font> 
<ul>
<li> <a href="https://github.com/sanjaymeena/UnsupervisedClusteringAlgorithms/blob/master/notebook/nearest-neighbors-features-and-metrics.ipynb">Nearest Neighbour Search </a></li>
<li> <a href="https://github.com/sanjaymeena/UnsupervisedClusteringAlgorithms/blob/master/notebook/kmeans-with-text-data.ipynb">Kmeans </a></li>
<li> <a href="https://github.com/sanjaymeena/UnsupervisedClusteringAlgorithms/blob/master/notebook/Latent%20Dirichlet%20Allocation%20for%20Text%20Data.ipynb">Latent Dirichlet Allocation </a></li>

</ul>

  </td> 
<td>2017</td> 
</tr>  


<tr> 
<td>NLP, Machine Learning</td>   
<td>Semantic Role Labeling (SRL) system  using Machine Learning - Pipeline of multiple logistic regression models. Also trainable models for Part of speech , Dependnecy Parsing</td>  
<td><font color="brown">Topics : </font>NLP, Machine Learning<br> <font color="brown">Development : </font> Java, LibLinear, Play Framework, Docker, Web Services</td>
<td> <a href="https://github.com/sanjaymeena/SemanticRoleLabeler">Code </a> <br> <a href="https://www.slideshare.net/sanjaymeena/semantic-role-labeling-80571393">Report </a>  </td> 
<td>2016</td> 

</tr> 
<tr> 
<td>Deep Learning</td>   
<td>Neural Network implemented from scratch</td>  
<td><font color="brown">Topics : </font>Deep Learning<br> <font color="brown">Development : </font> Python, Numpy, Pandas, Scikit</td>
<td> <a href="https://github.com/sanjaymeena/Deep-Learning-based-Spam-Filter">Code </a>  </td> 
<td>2017</td> 
</tr>  

<tr> 
<td>Data Science</td> 
<td>Projects and tasks related to <a href="https://zh-tw.coursera.org/learn/data-scientists-tools">The Data Scientist’s Toolbox</a> </td> 
<td> <font color="brown">Topics : </font> Predictive analytics, Reproducible research, Statistical Inference <br> <font color="brown">Development : </font> R</td>  
<td> <a href="https://rpubs.com/sanjaymeena">Reports </a> </td> 

<td> 2015</td>  
</tr>  

<tr> 
<td>Data Science</td> 
<td>Compound intereste calculator made using <a href="https://www.r-project.org/">R</a> and <a href="http://shiny.rstudio.com/">Shiny</a>, Web Application Framework for R. You can read a small report <a href="https://github.com/sanjaymeena/developing-data-products/blob/master/slides/compound_interest_shiny_presentation.md"><b>here</b></a></td>  
<td><font color="brown">Topics : </font>Data Products, R Application <br> <font color="brown">Development : </font> R, Shiny</td>
<td> <a href="https://sanjaymeena.shinyapps.io/compound_interest_calculator/">Demo </a> <br> <a href="https://github.com/sanjaymeena/developing-data-products">Code </a> <br> <a href="https://rpubs.com/sanjaymeena">Reports </a> </td> 

<td>2015</td> 
</tr> 
  </tbody>
</table>


### Core Natural Language Processing (NLP) Related 

At broader level i have worked on following topics : 

I have worked on core topics in NLP :

* Syntactic and Semantic Analysis using Syntactic Parse Trees , Dependency Parsing, Linguistic Knowledge
* Relation Extraction, Semantic Role Labeling 
* Named Entities Recognition (NER), Knowledge Graphs , Ontologies
* Discourse analysis at Sentence , Paragraph, Document Level for text
* Question Answering, Question Generation, Natural Language Generation (NLG)




<table id='corenlp' class='table table-bordered'>
  <thead>
    <tr>
     <th><h4>Area</h4></th>
      <th><h4>Description </h4></th>
      <th><h4>Keywords </h4></th>
      <th><h4>Links </h4></th>
      <th><h4>Year </h4></th>
    </tr>
  </thead>
  <tbody>


<tr> 
<td> NLP Core</td>
<td>Various Modules from NLP Pipeline </td>   
<td> <font color="brown">Topics : </font>NLP, Syntax Trees, Named Entities Recognition (NER), Discourse Analysis, Linguistics, Wordnet <br> <font color="brown">Development : </font>Java </td> 
<td> <a href="{{ site.baseurl }}/demos/nlp_modules/">Demo </a> </td> 
<td>2016 </td>   
</tr>  

<tr> 
<td> Grammar Analysis</td>
<td>Grammar Analysis of English Sentences using Syntactic Rules based on English Grammar. The System is designed to be generic using only standard english grammar rules. </td>   
<td> <font color="brown">Topics : </font>NLP, Syntax Trees, Named Entities Recognition (NER), Discourse Analysis, Linguistics, Wordnet <br> <font color="brown">Development : </font>Java </td> 
<td> <a href="{{ site.baseurl }}/demos/nlp_grammar_analysis/">Demo </a> </td> 
<td>2016 </td>   
</tr> 



<tr> 
<td>Google Chrome Extension</td>
<td>Text Analyzer Extension can provide grammatical and semantic information for the selected text in English directly in Google chrome browser</td> 
<td> <font color="brown">Topics : </font>Google Chrome Extension <br> <font color="brown">Development : </font> Javascript, Ajax, Html</td>  
<td> <a href="{{ site.baseurl }}/tech/javascript/text_analyzer_google_chrome_extension/">Report </a> <br> <a href="https://github.com/sanjaymeena/textanalyzer-chrome-extension">Code </a></td> 

<td>2015</td>   
</tr>  

<tr> 
<td> Gate Plugins</td>
<td>
Creating plugin for <a href="https://gate.ac.uk/">Gate </a> . 
</td> 
<td> <font color="brown">Topics : </font>NLP, Information Extraction,  <br> <font color="brown">Development : </font> Javascript, Ajax, Html</td>  
<td> <a href="https://github.com/sanjaymeena/GatePluginTutorial">Code </a></td> 

<td>2014</td>   
</tr> 



<tr> 
<td> NLP Pipeline</td>
<td>Information Extraction System can perform NLP tasks like Named Entity Recognition, Sentence Simplification, Relation Extraction etc.
</td> 
<td> <font color="brown">Topics : </font>NLP, Information Extraction,  <br> <font color="brown">Development : </font> Javascript, Ajax, Html</td>  
<td> <a href="https://github.com/sanjaymeena/InformationExtractionSystem">Code </a></td> 

<td>2013</td>   
</tr>  


</tbody>
</table>


