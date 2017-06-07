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
description : Statistics
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
	
$$ \mathsf { P (A|B) = \frac {P(A \cap B)} {P(B)} } $$

Bayes’ rule allows us to switch the conditioning event, provided a little bit of extra information. Formally Bayes’ rule is:



$$ \mathsf { P (B|A) = \frac {P(A|B) P(B)} { P(A|B) P(B) +  P(A|B^{'}) P(B^{'})} } $$

