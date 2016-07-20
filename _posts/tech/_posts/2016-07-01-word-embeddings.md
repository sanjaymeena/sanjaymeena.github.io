---
header:
  teaser: posts/tech/w2v/Mikolov-GenderVecs.png
  image:  posts/tech/w2v/Mikolov-GenderVecs.png
title: Word embeddings
author: Sanjay Meena
layout: single
sitemap: true
published: true
excerpt: Word embeddings
categories: [Tech]
tags: [NLP, Deep Learning]
keywords:  NLP, deep learning, w2v, word2vector, word embeddings
description : Word embeddings
---

<script type="text/javascript"
    src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>

<b> Table of Content </b>

* TOC
{:toc}

# Neural Word Embeddings


Word embeddings are one of the most exciting area of research in deep learning 

A neural word embedding $$ W: \mathrm{words} \to \mathbb{R}^n $$ is a paramaterized function mapping words in some language to high-dimensional vectors (perhaps 200 to 500 dimensions). For example, we might find:

$$ \mathsf{W("pair")=(0.2, -0.4, 0.7, ...)} $$

$$ \mathsf{W("pear")=(0.0, -0.1, 0.1, ...)} $$

In essence, it is a numerical vector to represent a word.


Word2vec’s applications extends beyond sentences. It can be applied just as well to genes, code, likes, playlists, social media graphs and other verbal or symbolic series in which patterns may be discerned.

The purpose and usefulness of Word2vec is to group the vectors of similar words together in vectorspace. That is, it detects similarities mathematically. Word2vec creates vectors that are distributed numerical representations of word features, features such as the context of individual words. It does so without human intervention.

## Different variants of word embeddings

### Word2Vec

Word2vec is a two-layer neural net that processes text. The input to the network is a text corpus and its output is a set of vectors: <b>feature vectors</b> for words in that corpus. Word2vec is not a deep neural network per se, however it is very useful as it turns text into a numerical form that that deep networks can understand.

[<img src="/images/posts/tech/w2v/neural_net.png" height = "200" width="500">](/images/posts/tech/w2v/neural_net.png)

<i>Figure : Two layer neural network with one hidden layer</i>



The motivation behind Word2vec is  captured by Firth’s hypothesis from 1957: 

``
“You shall know a word by the company it keeps.” 
``

To give an example, if I ask you to think of a word that tends to co-occur with cow, drink, calcium, you would immediately answer: milk.

Words can be considered as discrete states and then we are simply looking for the transitional probabilities between those states: the likelihood that they will co-occur.

Given enough data, usage and contexts, Word2vec can make highly accurate guesses about a word’s meaning based on past appearances. 


Those guesses can be used to establish a word’s association with other words in terms of vector arithmetics. 
For example: 

 $$ W(``\text{woman}\!") - W(``\text{man}\!") ~\simeq~ W(``\text{queen}\!") - W(``\text{king}\!") $$ 

Word clusters can form the basis of search, sentiment analysis and recommendations in such diverse fields as scientific research, legal discovery, e-commerce and customer relationship management.


[<img src="/images/posts/tech/w2v/Mikolov-AnalogyTable.png" height = "300" width="500">](/images/posts/tech/w2v/Mikolov-AnalogyTable.png)

<i>Figure: Relationship pairs in a word embedding. From Mikolov et al. (2013b).</i>

#### Word2Vec Architectures
Word2vec trains words against other words that neighbor them in the input corpus.

W2V comes in two flavors: 

1. Continuous bag of words (CBOW) 
    * We use context (surrounding words) to predict the target word.
2. Skip-gram 
    * We use a word to predict a target context (surrounding words)
    * This method can also work well with small amount of the training data. It can also represents rare words or phrases pretty well.


[<img src="/images/posts/tech/w2v/w2v_train_types.png" height = "450" width="700">](/images/posts/tech/w2v/w2v_train_types.png)


<i>Figure: Architecture for the CBOW and Skip-gram method. W(t) is the current word, while w(t-2), w(t-1), etc. are the surrounding words. </i>	


* References:
	* [http://arxiv.org/pdf/1301.3781.pdf](http://arxiv.org/pdf/1301.3781.pdf)
    * [http://multithreaded.stitchfix.com/blog/2015/03/11/word-is-worth-a-thousand-vectors/](http://multithreaded.stitchfix.com/blog/2015/03/11/word-is-worth-a-thousand-vectors/)
    * [http://www.slideshare.net/roelofp/041114-dl-nlpwordembeddings](http://www.slideshare.net/roelofp/041114-dl-nlpwordembeddings)
    * [https://github.com/3Top/word2vec-api#where-to-get-a-pretrained-models](https://github.com/3Top/word2vec-api#where-to-get-a-pretrained-models)



### Glove

* References
	* [http://www-nlp.stanford.edu/pubs/glove.pdf](http://www-nlp.stanford.edu/pubs/glove.pdf)

### Dependency based word embeddings


## Extensions of Word Embeddings

### Paragraph Vector 

[<img src="/images/posts/tech/w2v/gensim_doc.jpeg" height = "450" width="700">](/images/posts/tech/w2v/gensim_doc.jpeg)


### Skip Though Vectors

