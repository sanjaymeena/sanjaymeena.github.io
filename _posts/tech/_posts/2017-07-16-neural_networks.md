---
title: Statistics
author: Sanjay Meena
layout: single
sitemap: true
published: false
excerpt: Neural Networks
categories: [Tech]
tags: [NLP, Deep Learning]
keywords:  Neural Networks
description : Statistics
share: twitter facebook linkedin
---



<b> Table of Content </b>

* TOC
{:toc}



## Common non linearities

* Sigmoid
* Hyperbolic tangent (tanh)
* Hard tanh
* Rectifier (Relu)

## Output Transformation

In many case, the output layer vector is also transformed. A common transformation used is the Softmax

The result is a vector of non negative real numbers that sum to 1 , making it a discrete probability distribution over K possible outcomes. 

When the softmax transformation is applied to the output of a netowrk without a hidden layer , the result is known as 
* Multinomial logistic regression or maximum entropy classifier 

### Embedding Layers

### Loss functions

When training a neural network, one defines a loss function , stating the loss of predicting y when the true output is y. 

* The training objective is to minimize the loss across different training examples. 
* The loss assigns a numerical score (a scalar) for the network's output y given the expected output y. 
* The loss function is always positive, and should be zero when the network's output is correct. 


The parameters of the network (the matrices w1, and biases b1, and commonly the embedding E) are then set in order to minimize the loss L over the training examples (usually , it is the sum of loss over the different training examples that is being minimized)

For practical purposes of optimization, We only use functions for which we can easily compute gradient or subgradient.  

In most cases, it is sufficient to rely on common loss functions rather than creating our own. 

Some common use loss functions

* Hinge loss
* Log loss
* categorical cross-entropy loss

Ranking losses

In some settings, we are not given supervision in terms of labels, but rather as pairs of correct and incorrect items x and x' and our goal is to score correct items over incorrect items.


# Neural Network Training

Roughly speaking, all neural network training methods work by repeatedly 

* computing an estimate of the error over the dataset 
* compute the gradient with respect to the error
* moving the parameters in the direction of the gradient

Neural Network Models differ in

*  how the error estimate is calculated, 
*  and "how moving in the direction of the gradient" is defined. 


### Stochastic gradient Descent algorithm
A common way of reducing the noise in loss computation is to estimate the error and the gradients based on m samples. This is mini batch gradient descent algorithm


The gradient computation is a key step in SGD as well as in all training algorithms

The Backpropagation algorithm (Rumelhart, Hinton, & Williams, 1986;
Lecun, Bottou, Bengio, & Haffner, 1998b) is the solution. 


It is a fancy name for methodologically computing the derivates of a complex expression using the chain, rule , while caching intermediary results. 

Back propagation algorithm is a special case of reverse-mode automatic differentiation algorithm (Neidinger, 2010,
Section 7), (Baydin, Pearlmutter, Radul, & Siskind, 2015; Bengio, 2012)


Beyond SGD
SGD produces good results but there are many more advanced algorithms as well. 

SGD+ Momentum and Nesterov momentum algorithms are variants of SGD in which previous gradients are accumulated and affect the current updates. 

Adaptive learning algorithm are designed to select the learning rate for each minibatch, sometimes on per coordinate basis, potentially alleviating the need of fiddling with learning rate scheduling. 

Most Common adaptive rate algorithms are :

* AdaGrad
* AdaDelta
* RMSProp


## Some common optimization issues

### Initialisation

### Vanishing and Exploding gradients

### Saturation and dead neurons

### Shuffling

### Learning rate

### Minibatches

    
## Preventing Overfitting

### Regularization

### Drop out


# Cascanding and Multi Task Learning

## Model Cascading

## Multi-task learning



# Structured Output Prediction


## Greedy structured Prediction

## Search Based Structured Prediction

## Probabilistic Objective (CRF)

## Reranking





