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
keywords:  NLP, deep learning, w2v, word2vector, word embeddings, paragraph vector, gensim, skip-thoughts, skip-thought vectors
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

We will explore different versions of this vectors in this post.

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

Word2vec was created by a team of researchers led by Tomas Mikolov at Google. It is described in this [paper](https://arxiv.org/pdf/1301.3781.pdf). 

Word2vec is a two-layer neural net that processes text. The input to the network is a text corpus and its output is a set of vectors: <b>feature vectors</b> for words in that corpus. Word2vec is not a deep neural network per se, however it is very useful as it turns text into a numerical form that that deep networks can understand.

[<img src="/images/posts/tech/w2v/neural_net.png" height = "300" width="300">](/images/posts/tech/w2v/neural_net.png)
<figcaption>Figure 1 : Two layer neural network with one hidden layer</figcaption>

The motivation behind Word2vec is  captured by Firth’s hypothesis from 1957: 

``
“You shall know a word by the company it keeps.” 
``

To give an example, if I ask you to think of a word that tends to co-occur with cow, drink, calcium, you would immediately answer: milk.

Words can be considered as discrete states and then we are simply looking for the transitional probabilities between those states: the likelihood that they will co-occur.

[Mikolov et al. (2013b)](https://papers.nips.cc/paper/5021-distributed-representations-of-words-and-phrases-and-their-compositionality.pdf) presented the popular word2vec framework for learning word vectors. 

In this framework, every word is mapped to a unique vector, represented by a column in a matrix W. The column is indexed by position of the word in the vocabulary. The concatenation or sum of the vectors is then used as features
for prediction of the next word in a sentence.

[<img src="/images/posts/tech/w2v/w2v_framework.png" height = "400" width="400">](/images/posts/tech/w2v/w2v_framework.png)
<figcaption>Figure 2 : Framework for learning word vectors. Context of three words (“the,” “cat,” and “sat”) is used to predict the fourth
word (“on”). The input words are mapped to columns of the matrix W to predict the output word. Mikolov et al. (2013)</figcaption>

Given enough data, usage and contexts, Word2vec can make highly accurate guesses about a word’s meaning based on past appearances. 

Those guesses can be used to establish a word’s association with other words in terms of vector arithmetics. 
For example: 

 $$ W(``\text{woman}\!") - W(``\text{man}\!") ~\simeq~ W(``\text{queen}\!") - W(``\text{king}\!") $$ 

The imabe below shows the relationship pairs described by Mikolov.

[<img src="/images/posts/tech/w2v/Mikolov-AnalogyTable.png" height = "300" width="500">](/images/posts/tech/w2v/Mikolov-AnalogyTable.png)
<figcaption>Figure 3 : Relationship pairs in a word embedding. From Mikolov et al. (2013b).</figcaption>


### Word2Vec Architectures
Word2vec trains words against other words that neighbor them in the input corpus.

Word2vec comes in two flavors: 

1. Continuous bag of words (CBOW) 
    * Context (surrounding words) is used to predict the target word.
2. Skip-gram with negative sampling or Skip-gram
    * A word is used to predict a target context (surrounding words)
    * This method can also work well with small amount of the training data. It can also represents rare words or phrases pretty well.


The image below shows the two architectures: 

[<img src="/images/posts/tech/w2v/w2v_train_types.png" height = "350" width="600">](/images/posts/tech/w2v/w2v_train_types.png)
<figcaption>Figure 4 : Architecture for the CBOW and Skip-gram method. W(t) is the current word, while w(t-2), w(t-1), etc. are the surrounding words.</figcaption>


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

In my work on some classification tasks, i found Glove to perform better than Word2vec . I  used  publicly available models for [word2vec](https://code.google.com/archive/p/word2vec/) and [Glove](http://nlp.stanford.edu/projects/glove/)
<hr>

## Dependency based word embeddings
Current models like word2vec, glove are based solely on linear contexts. In this work, Levy and Goldberg have generalized the skip-gram model with negative sampling introduced by Mikolov et al. to include arbitrary context. Specifically they have experimented with syntactic context.

The original implementation of Skip-Gram assumes bag-of-words contexts, that is, neighboring words.

Dependency-based embeddings are qualitatively different from the original embeddings.

[<img src="/images/posts/tech/w2v/wordembeddings-dependency-based.png" height = "300" width="400">](/images/posts/tech/w2v/wordembeddings-dependency-based.png)
<figcaption>Figure 5 : Dependency-based context extraction example. Omer Levy and Yoav Goldberg</figcaption>


The dependency based embeddings are less topical and exhibit more functional similarity than the original skip-gram embeddings.

[<img src="/images/posts/tech/w2v/w2v_dependency_based.png" height = "350" width="450">](/images/posts/tech/w2v/w2v_dependency_based.png)
<figcaption>Figure 6: Embedding Similarity with Different Contexts</figcaption>


Code, Word Embeddings and Demo can be found at [Omer Levy's blog](https://levyomer.wordpress.com/2014/04/25/dependency-based-word-embeddings/)
<hr>
## Extensions of Word Embeddings beyond words

The word2vec model has been extened to work beyond different words. Two popular methods are described below: 

1. Paragraph Vector
2. Skip-thought Vectors

### Paragraph Vector 

[The paragraph vectors](https://cs.stanford.edu/~quocle/paragraph_vector.pdf) are inspired by the methods for learning the word vectors.
They learn unsupervised representations of arbitrarily-long paragraphs/documents, based on an extension of the word2vec model. 

[<img src="/images/posts/tech/w2v/sentence2vec0.png" height = "300" width="400">](/images/posts/tech/w2v/sentence2vec0.png)
<figcaption>Figure 7: A framework for learning paragraph vector. </figcaption>

This framework is similar to the framework presented in Figure 1; the only
change is the additional paragraph token that is mapped to a vector via matrix D. In this model, the concatenation or average of this vector with a context of three words is used to predict the fourth word. The paragraph vector represents the missing information from the current context and can act as a memory of the topic of the paragraph.


There are two version of paragraph vectors : 

1. Distributed Memory version of Paragraph Vector (PV-DM)
2. Distributed Bag of Words version of Paragraph Vector (PV-DBOW)


#### Distributed Memory version of Paragraph Vector (PV-DM)
The framework we discussed above is PV-DM version. It considers the paragraph vector with the word vectors to predict the next word in a text window.



#### Distributed Bag of Words version of Paragraph Vector (PV-DBOW)
This method ignores the context words in the input. The paragraph vector is trained to predict the words in a small window. This method requires less storage and is very similar to the skip-gram modesl in word vectors (Mikolov et al., 2013c)


[<img src="/images/posts/tech/w2v/sentence2vec1.png" height = "300" width="400">](/images/posts/tech/w2v/sentence2vec1.png)
<figcaption>Figure 8: Distributed bag of Words version of paragraph vectors. </figcaption>

From expirements described in [Mikolov's paper on paragraph vectors](https://cs.stanford.edu/~quocle/paragraph_vector.pdf) combination of PV-DM with PV-DBOW is more consistent across many tasks like Sentiment Analysis , Information retrieval.

### Skip-Thought Vectors
[Skip-Thought Vectors](http://arxiv.org/pdf/1506.06726v1.pdf) are unsupervised sentence vectors. The inspiration is word vector learning. This method abstracts the skip-gram model of words to sentences the sentence level. So, instead of using a word to predit its surrounding context (or words in this case), Skip thoughts <b> encode a sentence to predict the sentences around it.</b>

Skip Thought Model requires having a training corpus of contiguous text. [The paper](http://arxiv.org/pdf/1506.06726v1.pdf) trained on a large collection of novels, namely the [BookCorpus dataset](http://www.cs.toronto.edu/~mbweb/).


[<img src="/images/posts/tech/w2v/skip-thought.png" height = "450" width="700">](/images/posts/tech/w2v/skip-thought.png)
<figcaption>Figure 9: The skip-thoughts model </figcaption>

Given a tuple $$ {(s}_{i−1}, {s}_i, {s}_{i+1}) $$ of contiguous sentences, with $$ {s}_{i−1} $$ the i-th sentence of a book, the sentence $$ {s}_{i} $$ is encoded and tries to reconstruct the previous sentence $$ {s}_{i-1} $$  and next sentence $$ {s}_{i+1} $$ . 

In this example, the input is the sentence triplet : 

* I got back home. 
* I could see the cat on the steps.
* This was strange. 

Unattached arrows are connected to the encoder output. Colors indicate which components share parameters. $$ {<eos>} $$ is the end of sentence token.


Skip-thoughts is the framework of encoder-decoder model. Encoderdecoder
models have gained a lot of traction for neural machine translation. 

* Encoder maps words to a sentence vector 
* Decoder is used to generate the surrounding sentences. The decoder then conditions on this vector to generate a translation for the source English sentence. 

Skip-thought model uses an  RNN encoder with GRU activations and an RNN decoder with a conditional GRU.

The trained model in the paper was able to achieve state of the art performance on following tasks :

- Semantic relatedness (sentence similarity)
- Paraphrase detection
- Image-sentence ranking    
- Question-type classification
- Sentiment and subjectivity datasets

Sent2Vec encoder and training code from the paper "Skip-Thought Vectors" is available on [github.](https://github.com/ryankiros/skip-thoughts) 

I trained a skip-thought model for my work based on the public code. I found the current version of encoder to be really slow especially for large number of sentences. 

## Gensim Python Package

[Gensim](https://radimrehurek.com/gensim/) python package is  robust, efficient for unsupervised semantic modelling from plain text. It has as very readable implementation of Word2Vec (and Doc2Vec). 

  
Doc2vec (aka paragraph2vec, aka sentence embeddings) modifies the word2vec algorithm to unsupervised learning of continuous representations for larger blocks of text, such as sentences, paragraphs or entire documents.
Gensim Doc2Vec

[<img src="/images/posts/tech/w2v/gensim_doc.jpeg" height = "400" width="400">](/images/posts/tech/w2v/gensim_doc.jpeg)
<figcaption>Figure 10: Gensim Doc2Vec</figcaption>


There are various tutorial online for how to use gensim for word2vec and doc2vec. 

- [http://rare-technologies.com/doc2vec-tutorial/](http://rare-technologies.com/doc2vec-tutorial/)
- [http://ufldl.stanford.edu/wiki/index.php/UFLDL_Tutorial](http://ufldl.stanford.edu/wiki/index.php/UFLDL_Tutorial)
- [http://www.wildml.com/2015/09/implementing-a-neural-network-from-scratch/](http://www.wildml.com/2015/09/implementing-a-neural-network-from-scratch/)
- [https://linanqiu.github.io/2015/10/07/word2vec-sentiment/](https://linanqiu.github.io/2015/10/07/word2vec-sentiment/)





