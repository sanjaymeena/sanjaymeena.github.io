---
title: Statistics
author: Sanjay Meena
layout: single
sitemap: true
published: false
excerpt: Statistics
categories: [Tech]
tags: [NLP, Statistics]
keywords: Statistics
description : Statistical Inference
share: twitter facebook linkedin
---

<script type="text/javascript"
    src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>

<b> Table of Content </b>

* TOC
{:toc}


# Introduction

Several tools are key to the use of statistical inference. Recognizing them helps us to have a holistic view of Statistics. 

* Randomization: 
	* Concerned with balancing unobserved variables that may confound inferences of interest.
* Random sampling: 
	* Concerned with obtaining data that is representative of the population of interest.
* Sampling models: 
	* Concerned with creating a model for the sampling process, the most common is so called “iid”.
* Hypothesis testing: 
	* Concerned with decision making in the presence of uncertainty.
* Confidence intervals: 
	* Concerned with quantifying uncertainty in estimation.
* Probability models: 
	* A formal connection between the data and a population of interest. Often probability models are assumed or are approximated.
* Study design: 
	* the process of designing an experiment to minimize biases and variability.
* Nonparametric bootstrapping:
	*  The process of using the data to, with minimal probability model assumptions, create inferences.
* Permutation, randomization and exchangeability testing: 
	* the process of using data permutations to perform inferences.



## Probablity
Probability forms the foundation for almost all treatments of statistical inference.


* The probability that nothing occurs is 0
* The probability that something occurs is 1
* The probability of something is 1 minus the probability that the opposite occurs
* The probability of at least one of two (or more) things that can not simultaneously occur (mutually exclusive) is the sum of their respective probabilities
* For any two events the probability that at least one occurs is the sum of their probabilities minus their intersection.


$$ \mathsf{ P(A \cup B) = P(A) + P(B) - P( A \cap B ) } $$


## Random Variables

A random variable is a numerical outcome of an experiment. The random variables  broadly come in two varieties : 

* Discrete random variables : takes only a countable number of possibilities
* Continuous random variables : These can take any value on the real line. 

`
Q: If you had a ruler of infinite precision, would measuring the height of adults around the world be continuous or discrete?
A: Continous
`

`
Q: Is the drawing of a hand of cards continuous or discrete?
A: Discrete
`



Some gambling experiments like the tossing of a coin and the rolling of a die produce random variables. 


We need convenient mathematical functions to model the probabilities of these random variables . They take possible values of the random variables, and assign the associated probabilities.



### Probability Mass Function (PMF) 
This function is  asssociated with  a discrete random variable. A probability mass function evaluated at a value corresponds to the probability that a random variable takes that value. To be a valid pmf a function, , must satisfy following conditions:

1.  It must always be larger than or equal to 0.
2. The sum of the possible values that the random variable can take has to add up to one.



### Probability Density Function (PDF)

This function  is associated with a continuous random variable. Areas under PDFs correspond to probabilities for that random variable

To be a valid pmf a function, , must satisfy following conditions:

* It must be larger than or equal to zero everywhere.
* The total area under it must be one.



### CDF and survival function

Certain areas of PDFs and PMFs are very useful. 

The cumulative distribution function (CDF) of a random variable, X, returns the probability that the random variable is less than or equal to the value X
This definition applies regardless of whether the random variable is discrete or continuous.

$$ \mathsf{ F(x) = P(X \leq x ) } $$


The survival function of a random variable X is defined as the probability that the random variable is greater than the value x.

$$ \mathsf{ S(x) = P(X \gt x ) } $$



Please note that : $$ \mathsf{ S(x) = 1 - F(x) } $$

### Quantiles and Percentiles

#### Quantiles

If you were the 95th percentile on an exam, you know that 95% of people scored worse than you and 5% scored better. 

The $$ \mathsf{ \alpha } $$ quantile of a distribution with distribution function F is the point  $$ \mathsf{ x_{\alpha} } $$ so that : 
	
$$ \mathsf{ F(x_{\alpha}) = \alpha } $$

So the 0.95 quantile of a distribution is the point so that 95% of the mass of the density lies below it.
Remember that quantiles have units.

#### Percentiles

A percentile is simply a quantile with $$ \mathsf {\alpha} $$ expressed as a percent rather than a proportion. Remember that percentiles are not probabilities!

## Conditional Probablility

Conditioning is a central subject in statistics. If have information about a random variable, it changes the probabilities associated with it. 
This is the idea of conditioning, taking away the randomness that we know to have occurred. 

Let B be an event so that P(B) > 0. Then the conditional probability of an event A given that B has occurred is:
	
$$ \mathsf{P(B|A) = \frac {P(A \cap B)} {P(A)} = P (A|B) *  \frac {P(B)} {P(A)}} $$

Suppose we don't know P(A) itself, but only know its conditional probabilities, that is, the probability that it occurs if B occurs and the probability that it occurs if B doesn't occur. 


We can then express P(A) as : 
$$ \mathsf { P(A) = P(A|B) * P(B) + P(A| B^{`}) * P(B^{`}) } $$  

and substitute this is into the denominator of Bayes' Formula to get : 

$$ \mathsf {P(B|A) = \frac {P(A|B) P(B)} { P(A|B) P(B) +  P(A|B^{`}) P(B^{`})} } $$



## Statistical Independence

Two events A and B are independent if

$$ \mathsf { P (A \cap B) = P(A) P(B) } $$

* Important principle is that probabilities of independent things multiply! 
* It also means that we shouldn’t multiply non-independent probabilities.


## Independent and Identically Distributed (IID) random variables


Random variables are said to be iid if they are independent and identically distributed. By independent we mean "statistically unrelated from one another". Identically distributed means that "all have been drawn from the same population distribution".

Random variables which are iid are the default model for random samples and many of the importany theories of statistics assume that variables are iid. 



## Expected Values
Expected values characterize a distribution. 

### The population mean for discrete random variables

The expected value or (population) mean of a random variable is the center of its distribution. For discrete random variable X with PMF p(x), it is defined as follows:

$$ \mathsf { E[X] = \sum_{x} xp(x)} $$



### The sample mean

The sample mean (estimator) estimates the population mean (estimand. Since the population mean is the center of mass of the population distribution, the sample mean is the center of mass of the data. sample mean is an unbiased estimator of the population mean.

$$ \mathsf { \bar {X }= \sum_{i=1}^n x_{i}p(x_{i})} $$

the distribution of the estimator (the sample mean) is centered at the distribution of what it’s estimating (the population mean). 

Some important points to remember are : 

* Expected values are properties of distributions.
* The average, or mean, of random variables is itself a random variable and its associated distribution itself has an expected value. 
* The center of this distribution is the same as that of the original distribution.
* The population mean is the center of mass of population.
* The sample mean is the center of mass of the observed data.
* The sample mean is an estimate of the population mean.
* The sample mean is unbiased: the population mean of its distribution is the mean that it’s trying to estimate.
* The more data that goes into the sample mean, the more. concentrated its density / mass function is around the population mean.


## Variance

The variance, on the other hand, is a measure of spread. 

If X is a random variable with mean $$ \mathsf {\mu} $$ , the variance of X is defined as

$$ \mathsf { Var(X) = E[(X- \mu)^2] = E[X^2] - E[X]^2} $$

Variance of a coin flip , with probability of head as P is : 

$$ \mathsf {Var(X) = E[X^2] - E[X]^2 = p - p^2 = p(1 - p) } $$


Because it is often more useful to use measurements in the same units as X,  we define the standard deviation of X as the square root of Var(X).


* Densities with a higher variance are more spread out than densities with a lower variance. 
* The square root of the variance is called the standard deviation. The main benefit of working with standard deviations is that they have the same units as the data, whereas the variance has the units squared.


### Sample variance 

The sample variance is the estimator of the population variance. The sample variance is (almost) the average squared deviation of observations around the sample mean. It is given by

$$ \mathsf {S^2 = \frac {\sum_{i=1} (X_i - \bar {X})^2} {n-1}  } $$


The sample Standard deviation S , is the square root of the sample variance. 

## Standard Error
We call the standard deviation of a statistic its standard error.

* The sample variance, $$ \mathsf {S^2} $$ , estimates the population variance, $$ \mathsf {\sigma^2} $$
* The distribution of the sample variance is centered around population variance , $$ \mathsf {\sigma^2} $$
* The variance of the sample mean is $$ \mathsf {\frac {\sigma^2} {n}} $$
* Its logical estimate is $$ \mathsf { \frac  {s^2} {n}}$$
* The logical estimate of the standard error is  $$ \mathsf { \frac {S} {\sqrt {n} }} $$
* S, the standard deviation, talks about how variable the population is.
* $$ \mathsf { \frac {S} {\sqrt {n}}} $$ , the standard error, talks about how variable averages of random samples of size n from the population are.

