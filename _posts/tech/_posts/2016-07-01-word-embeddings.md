---
header:
  teaser: posts/tech/w2v/Mikolov-GenderVecs.png
  image:  posts/tech/w2v/Mikolov-GenderVecs.png
title: Meanings are Vectors
author: Sanjay Meena
layout: single
sitemap: true
published: false
excerpt: A recent big idea in natural language processing is that "meanings are vectors" . Word embeddings are one of the most exciting area of research in deep learning.
categories: [Tech]
tags: [NLP, Deep Learning]
keywords:  NLP, deep learning, w2v, word2vector, word embeddings
description : A recent big idea in natural language processing is that "meanings are vectors" . Word embeddings are one of the most exciting area of research in deep learning.
---

<script type="text/javascript"
    src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>

<b> Table of Content </b>

* TOC
{:toc}

# Introduction
A recent big idea in natural language processing is that "meanings are vectors" . The approximate meaning of a word or phrase can be represented as a vector in a multi-dimensional space. Vectors that are close to each other represent similar meanings. 

# Neural Word Embeddings
Word embeddings are one of the most exciting area of research in deep learning.

A neural word embedding $$ W: \mathrm{words} \to \mathbb{R}^n $$ is a paramaterized function mapping words in some language to high-dimensional vectors (perhaps 200 to 500 dimensions). For example, we might find:

$$ \mathsf{W("pair")=(0.2, -0.4, 0.7, ...)} $$

$$ \mathsf{W("pear")=(0.0, -0.1, 0.1, ...)} $$

In essence, it is a numerical vector to represent a word.

Their applications extends beyond sentences. It can be applied just as well to genes, code, likes, playlists, social media graphs and other verbal or symbolic series in which patterns may be discerned.

The purpose and usefulness of word embeddings is to group the vectors of similar words together in vectorspace. That is, it detects similarities mathematically.These vectors are distributed numerical representations of word features, features such as the context of individual words. And, all this is done without human intervention. 

Word clusters can form the basis of search, sentiment analysis and recommendations in such diverse fields as scientific research, legal discovery, e-commerce and customer relationship management.

Now we will look at different variants of word embeddings.

## Word2Vec

Word2vec is a two-layer neural net that processes text. The input to the network is a text corpus and its output is a set of vectors: <b>feature vectors</b> for words in that corpus. Word2vec is not a deep neural network per se, however it is very useful as it turns text into a numerical form that that deep networks can understand.

[<img src="/images/posts/tech/w2v/neural_net.png" height = "300" width="300">](/images/posts/tech/w2v/neural_net.png)
<figcaption>Figure : Two layer neural network with one hidden layer</figcaption>

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


[<img src="/images/posts/tech/w2v/Mikolov-AnalogyTable.png" height = "300" width="500">](/images/posts/tech/w2v/Mikolov-AnalogyTable.png)
<figcaption>Figure: Relationship pairs in a word embedding. From Mikolov et al. (2013b).</figcaption>


### Word2Vec Architectures
Word2vec trains words against other words that neighbor them in the input corpus.

W2V comes in two flavors: 

1. Continuous bag of words (CBOW) 
    * We use context (surrounding words) to predict the target word.
2. Skip-gram 
    * We use a word to predict a target context (surrounding words)
    * This method can also work well with small amount of the training data. It can also represents rare words or phrases pretty well.


[<img src="/images/posts/tech/w2v/w2v_train_types.png" height = "350" width="600">](/images/posts/tech/w2v/w2v_train_types.png)
<figcaption>Figure: Architecture for the CBOW and Skip-gram method. W(t) is the current word, while w(t-2), w(t-1), etc. are the surrounding words.</figcaption>


References:

* [http://arxiv.org/pdf/1301.3781.pdf](http://arxiv.org/pdf/1301.3781.pdf)
* [http://multithreaded.stitchfix.com/blog/2015/03/11/word-is-worth-a-thousand-vectors/](http://multithreaded.stitchfix.com/blog/2015/03/11/word-is-worth-a-thousand-vectors/)
* [http://www.slideshare.net/roelofp/041114-dl-nlpwordembeddings](http://www.slideshare.net/roelofp/041114-dl-nlpwordembeddings)
* [https://github.com/3Top/word2vec-api#where-to-get-a-pretrained-models](https://github.com/3Top/word2vec-api#where-to-get-a-pretrained-models)
<hr>
## Glove
Stanford’s GloVe: [Global Vectors for Word Representation](http://www-nlp.stanford.edu/pubs/glove.pdf)  is an unsupervised learning algorithm for obtaining vector representations for words. 

Training is performed on aggregated global word-word co-occurrence statistics from a corpus, and the resulting representations showcase interesting linear substructures of the word vector space.

[Levy et al.](http://www.aclweb.org/anthology/Q15-1016) reported that there is no significant performance difference between different word embeddings implementations like Glove, Word2vec etc. 

In my work on some classification tasks, i found Glove to perform better than Word2vec . I had used  publicly available models for [word2vec](https://code.google.com/archive/p/word2vec/) and [Glove](http://nlp.stanford.edu/projects/glove/)


## Dependency based word embeddings


Current models like word2vec, glove are based solely on linear contexts. In this work, Levy and Goldberg have generalized the skip-gram model with negative sampling introduced by Mikolov et al. to include arbitrary context. Specifically they have experimented with syntactic context.

The original implementation of Skip-Gram assumes bag-of-words contexts, that is, neighboring words.

Dependency-based embeddings are qualitatively different from the original embeddings.

[<img src="/images/posts/tech/w2v/wordembeddings-dependency-based.png" height = "300" width="400">](/images/posts/tech/w2v/wordembeddings-dependency-based.png)
<figcaption>Figure: Dependency-based context extraction example. Omer Levy and Yoav Goldberg</figcaption>


The dependency based embeddings are less topical and exhibit more functional similarity than the original skip-gram embeddings.

[<img src="/images/posts/tech/w2v/w2v_dependency_based.png" height = "350" width="450">](/images/posts/tech/w2v/w2v_dependency_based.png)
<figcaption>Figure: Embedding Similarity with Different Contexts</figcaption>


Code, Word Embeddings and Demo can be found at [Omer Levy's blog](https://levyomer.wordpress.com/2014/04/25/dependency-based-word-embeddings/)

## Extensions of Word Embeddings beyond words

The word2vec model has been extened to work beyond different 

### Paragraph Vector 

[The paragraph vectors](https://cs.stanford.edu/~quocle/paragraph_vector.pdf) are inspired by the methods for learning the word vectors.
They learn unsupervised representations of arbitrarily-long paragraphs/documents, based on an extension of the word2vec model. 



Paragraph Vectors

<figure class="half">
    <a href="/images/posts/tech/w2v/sentence2vec0.png"><img src="/images/posts/tech/w2v/sentence2vec0.png"></a>
    <a href="/images/posts/tech/w2v/sentence2vec0.png"><img src="/images/posts/tech/w2v/sentence2vec0.png"></a>
    <figcaption>Mikolov</figcaption>
    <figcaption>Mikolov</figcaption>
</figure>


#### Gensim Doc2Vec

Gensim Doc2Vec

[<img src="/images/posts/tech/w2v/gensim_doc.jpeg" height = "400" width="400">](/images/posts/tech/w2v/gensim_doc.jpeg)


### Skip Though Vectors

[<img src="/images/posts/tech/w2v/skip-thought.png" height = "450" width="700">](/images/posts/tech/w2v/skip-thought.png)

