---
title: Word embeddings
author: Sanjay Meena
layout: single
sitemap: true
published: false
excerpt: Word embeddings
categories: [Tech]
tags: [NLP, Deep Learning]
keywords:  NLP, deep learning, w2v, word2vector, word embeddings
description : Word embeddings
---

<b> Table of Content </b>

* TOC
{:toc}

# Word Embeddings

Word2vec is a two-layer neural net that processes text. The input to the network is a text corpus and its output is a set of vectors: <b>feature vectors</b> for words in that corpus. Word2vec is not a deep neural network per se, however it is very useful as it turns text into a numerical form that that deep networks can understand.

The motivation behind Word2vec is  captured by Firth’s hypothesis from 1957: 

```
“You shall know a word by the company it keeps.” 
```

To give an example, if I ask you to think of a word that tends to co-occur with cow, drink, calcium, you would immediately answer: milk.

Words can be considered as discrete states and then we are simply looking for the transitional probabilities between those states: the likelihood that they will co-occur. 

Word2vec’s applications extends beyond sentences. It can be applied just as well to genes, code, likes, playlists, social media graphs and other verbal or symbolic series in which patterns may be discerned.

The purpose and usefulness of Word2vec is to group the vectors of similar words together in vectorspace. That is, it detects similarities mathematically. Word2vec creates vectors that are distributed numerical representations of word features, features such as the context of individual words. It does so without human intervention.

Given enough data, usage and contexts, Word2vec can make highly accurate guesses about a word’s meaning based on past appearances. Those guesses can be used to establish a word’s association with other words (e.g. “man” is to “boy” what “woman” is to “girl”), or cluster documents and classify them by topic. Those clusters can form the basis of search, sentiment analysis and recommendations in such diverse fields as scientific research, legal discovery, e-commerce and customer relationship management.

The output of the Word2vec neural net is a vocabulary in which each item has a vector attached to it, which can be fed into a deep-learning net or simply queried to detect relationships between words.


### Training Word2Vector
Word2vec trains words against other words that neighbor them in the input corpus.

1. Continuous bag of words (CBOW) 
    * We use context (surrounding words) to predict the target word.
2. Skip-gram 
    * We use a word to predict a target context (surrounding words)
    * This method can also work well with small amount of the training data. It can also represents rare words or phrases pretty well.


[<img src="/images/posts/tech/w2v/w2v_train_types.png" height = "1500" width="1000">](/images/posts/tech/w2v/w2v_train_types.png)


Figure 1: Architecture for the CBOW and Skip-gram method, taken from [1]. W(t) is the current word, while w(t-2), w(t-1), etc. are the surrounding words.


### References

1. 

## Word2Vector



## Glove

## Dependency based word embeddings


# Extensions of Word Embeddings

## Paragraph Vector 

## Skip Though Vectors

