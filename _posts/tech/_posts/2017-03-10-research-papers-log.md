---
title: Research Summary Log
author: Sanjay Meena
layout: customjs
datatable: true
sitemap: true
published: true
excerpt: A summary log of read research papers in the field of AI
categories: [Tech]
tags: [NLP, Deep Learning]
keywords: research papers, AI, NLP, Deep Learning,research 
description : A summary log of read research papers in the field of AI
share: twitter facebook linkedin
---

I have started maintaining a summary log of the research papers i read related to my work. The papers are mostly related to :

* Natural Language Processing (NLP)
* Natural Language Understanding (NLU)
* Dialogue Systems
* Deep Learning

The table below can be searched and sorted by columns.


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

<script type="text/javascript" src="{{ site.baseurl }}/assets/js1/jquery.dataTables.min.js"></script>


<style type="text/css">
body,p,ul {
   
    
    font-size: .95em; /* Increase font-size */
   
}
</style>


<style type="text/css">
#reserachPapersTable {
   
    
    font-size: 15px; /* Increase font-size */
    line-height: 2;
}
</style>
   
<script>
$(document).ready(function(){


   $('#reserachPapersTable').DataTable( {
        language: {
        search: "_INPUT_",    
        searchPlaceholder: "Search ..."
    },
        paging: false,
        searching: true
     }
        );
});
</script>

<table id='reserachPapersTable' class='table table-bordered'>
<thead>
<th>Title</th>
<th>Topic</th>
<th>Summary</th>
<th>Keywords</th>
<th>Year</th>
</thead>
<tbody>
<tr>
<td><a href='http://aclweb.org/anthology/D16-1087'>Named Entity Recognition for Novel Types by Transfer Learning</a></td>
<td>Named Entity Recognition (NER)</td>
<td>Given training data in a related domain with similar (but not identical) named entity (NE) types and a small amount of in-domain training data, They use transfer learning to learn a domain-specific NE model.</td>
<td>NER;CRF;Transfer Learning</td>
<td>2016</td>
</tr>
<tr>
<td><a href='https://static1.squarespace.com/static/58177ecc1b631bded320b56e/t/585ab3b0e3df288638cbd331/1482339250251/Maluuba+Frames+Paper.pdf'>FRAMES: A Corpus for adding memory to Goal-Oriented Dialog Systems</a></td>
<td>Dialogue Systems</td>
<td>Based on Semantic Frames, This paper introduce a task called frame tracking, which generalizes state tracking to a setting where several states are tracked simultaneously. They show that Frames can also be used to study memory in dialogue management and information presentation through natural language generation. They also provide a baseline model for frame tracking task</td>
<td>Frames; Memory; Goal Oriented Dialogue; NLG; IOB; Frame Tracking</td>
<td>2016</td>
</tr>
<tr>
<td><a href='https://arxiv.org/pdf/1506.00019.pdf'>A Critical Review of Recurrent Neural Networks for Sequence Learning</a></td>
<td>Deep Learning</td>
<td>This paper provide a detailed explanation on Recurrent Neural Networks (RNN) and its state of the art variants : Long Short-Term Memory (LSTM) and bidirectional recurrent neural network (BRNN). Authors have synthesized the body of research over the past three decades that has yielded these powerful models. Some intersesting conclusions are : <ul><li> Many advances come from novel architectures rather than fundamentally novel algorithms</li><li>Extension of RNNs to longer form text in Natural language tasks will be fruitful.</li> <li>Dialogue systems could be built along similar principles to the architectures used for translation, encoding prompts and generating responses, retaining the entirety of conversation history as contextual information.</li></ul></td>
<td>Recurrent Neural Networks, Sequence Learning</td>
<td>2015</td>
</tr>
</tbody>
</table>




