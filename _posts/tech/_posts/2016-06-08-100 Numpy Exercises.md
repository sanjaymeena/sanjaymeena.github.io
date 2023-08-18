---
title:  NumPy  Exercises
author: Sanjay Meena
layout: single
published: true
comments: true
categories: [Tech]
tags: [python,numpy]
excerpt: NumPy is the fundamental package for scientific computing with Python. 
sitemap: true
description: NumPy is the fundamental package for scientific computing with Python. 
--- 
<!--more-->

[NumPy](https://www.numpy.org/) is the fundamental package for scientific computing with Python. .Knowledge of NumPy is very useful when implementing deep learning models in python based frameworks like [TensorFlow](https://www.tensorflow.org), [Theano](https://deeplearning.net/software/theano/) 

The exercise content of this post is already available from very useful [repository](https://www.labri.fr/perso/nrougier/teaching/numpy.100/). I wrote the exercises in Ipython notebook to make it easy to try them out . The ipython notebook is available at [github](https://github.com/sanjaymeena/numpy-100)

Some other useful resources to learn NumPy: 

* [https://www.bogotobogo.com/python/python_numpy_array_tutorial_basic_A.php](https://www.bogotobogo.com/python/python_numpy_array_tutorial_basic_A.php)
* [https://www.bogotobogo.com/python/python_numpy_array_tutorial_basic_B.php](https://www.bogotobogo.com/python/python_numpy_array_tutorial_basic_B.php)
* [https://nbviewer.jupyter.org/github/andrewgiessel/pydata_bos_2013_intro_to_numpy/blob/master/Introduction%20To%20NumPy.ipynb](https://nbviewer.jupyter.org/github/andrewgiessel/pydata_bos_2013_intro_to_numpy/blob/master/Introduction%20To%20NumPy.ipynb)


Below are the list of Numpy exercises :

* TOC
{:toc}


#### 1. Import the numpy package under the name np

```python

import numpy as np
```

#### 2. Print the numpy version and the configuration


```python
print(np.__version__)
np.__config__.show()
```

    1.11.0
    atlas_3_10_blas_threads_info:
      NOT AVAILABLE
    atlas_info:
      NOT AVAILABLE
    atlas_3_10_info:
      NOT AVAILABLE
    lapack_opt_info:
        extra_link_args = ['-Wl,-framework', '-Wl,Accelerate']
        extra_compile_args = ['-msse3']
        define_macros = [('NO_ATLAS_INFO', 3), ('HAVE_CBLAS', None)]
    mkl_info:
      NOT AVAILABLE
    openblas_lapack_info:
      NOT AVAILABLE
    atlas_3_10_threads_info:
      NOT AVAILABLE
    openblas_info:
      NOT AVAILABLE
    atlas_threads_info:
      NOT AVAILABLE
    lapack_mkl_info:
      NOT AVAILABLE
    blas_opt_info:
        extra_link_args = ['-Wl,-framework', '-Wl,Accelerate']
        extra_compile_args = ['-msse3', '-I/System/Library/Frameworks/vecLib.framework/Headers']
        define_macros = [('NO_ATLAS_INFO', 3), ('HAVE_CBLAS', None)]
    blas_mkl_info:
      NOT AVAILABLE
    atlas_blas_info:
      NOT AVAILABLE
    atlas_blas_threads_info:
      NOT AVAILABLE
    atlas_3_10_blas_info:
      NOT AVAILABLE


#### 3. Create a null vector of size 10
 

```python
Z = np.zeros(10)
print(Z)
```

    [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.]



#### 4. How to get the documentation of the numpy add function from the command line ?
```python

python -c "import numpy; numpy.info(numpy.add)"
```

#### 5. Create a null vector of size 10 but the fifth value which is 1 
```python
Z= np.zeros(10)
Z[4]= 1
print (Z)
```

    [ 0.  0.  0.  0.  1.  0.  0.  0.  0.  0.]


#### 6. Create a vector with values ranging from 10 to 49
```python
Z=np.arange(10,50)
print (Z)
```

    [10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34
     35 36 37 38 39 40 41 42 43 44 45 46 47 48 49]


#### 7. Reverse a vector (first element becomes last) 
```python

Z = np.arange(10,50)
Z= Z[::-1]
print (Z)
```

    [49 48 47 46 45 44 43 42 41 40 39 38 37 36 35 34 33 32 31 30 29 28 27 26 25
     24 23 22 21 20 19 18 17 16 15 14 13 12 11 10]


#### 8. Create a 3x3 matrix with values ranging from 0 to 8 

```python
Z = np.arange(9).reshape(3,3)
print (Z)
```

    [[0 1 2]
     [3 4 5]
     [6 7 8]]


#### 9. Find indices of non-zero elements from [1,2,0,0,4,0] 
```python

nz = np.nonzero([1,2,0,0,4,0])
print(nz)
```

    (array([0, 1, 4]),)


#### 10. Create a 3x3 identity matrix
```python
Z= np.eye(3)
print (Z)
```

    [[ 1.  0.  0.]
     [ 0.  1.  0.]
     [ 0.  0.  1.]]


#### 11. Create a 3x3x3 array with random values 
```python
Z = np.random.uniform((3,3,3))
print (Z)
```

    [ 1.98197312  2.13949619  2.67152251]


#### 12. Create a 10x10 array with random values and find the minimum and maximum values 

```python
Z = np.random.random((10,10))
Zmin, Zmax = Z.min(), Z.max()
print(Zmin, Zmax)
```

    0.0113751594253 0.995035059799


#### 13. Create a random vector of size 30 and find the mean value
```python

Z = np.random.random(10)
m = Z.mean()
print (m)

```

#### 14. Create a 2d array with 1 on the border and 0 inside 
```python

Z = np.ones((10,10))
Z[1:-1,1:-1]=0

```

#### 15. What is the result of the following expression ?
```python
print(0 * np.nan)
print(np.nan == np.nan)
print(np.inf > np.nan)
print(np.nan - np.nan)
print(0.3 == 3 * 0.1)
```

    nan
    False
    False
    nan
    False


#### 16. Create a 5x5 matrix with values 1,2,3,4 just below the diagonal

```python

Z = np.diag(1+np.arange(4), k = -1)
print (Z)
```

    [[0 0 0 0 0]
     [1 0 0 0 0]
     [0 2 0 0 0]
     [0 0 3 0 0]
     [0 0 0 4 0]]


#### 17. Create a 8x8 matrix and fill it with a checkerboard pattern
```python
Z = np.zeros ((8,8), dtype=int)
Z[1::2, ::2]= 1
Z[::2, 1::2] = 1
print (Z)
```

    [[0 1 0 1 0 1 0 1]
     [1 0 1 0 1 0 1 0]
     [0 1 0 1 0 1 0 1]
     [1 0 1 0 1 0 1 0]
     [0 1 0 1 0 1 0 1]
     [1 0 1 0 1 0 1 0]
     [0 1 0 1 0 1 0 1]
     [1 0 1 0 1 0 1 0]]


#### 18. Consider a (6,7,8) shape array, what is the index (x,y,z) of the 100th element ?
```python


print (np.unravel_index(100, (6,7,8)))
```

    (1, 5, 4)


#### 19. Create a checkerboard 8x8 matrix using the tile function 
```python
array= np.array([[0,1], [1,0]])
Z = np.tile(array,(4,4))
print (Z)
```

    [[0 1 0 1 0 1 0 1]
     [1 0 1 0 1 0 1 0]
     [0 1 0 1 0 1 0 1]
     [1 0 1 0 1 0 1 0]
     [0 1 0 1 0 1 0 1]
     [1 0 1 0 1 0 1 0]
     [0 1 0 1 0 1 0 1]
     [1 0 1 0 1 0 1 0]]


#### 20. Normalize a 5x5 random matrix
```python

Z = np.random.random((5,5))
Zmax, Zmin = Z.max(), Z.min()
Z= (Z-Zmin)/(Zmax-Zmin)
print (Z)
```

    [[ 0.09302268  0.68516964  0.6563152   0.94814362  0.22654368]
     [ 0.92271393  0.08410377  0.00143531  0.57251683  0.85246156]
     [ 0.78987722  0.83070898  0.43102794  0.19263371  0.62121751]
     [ 0.18670368  0.05883253  0.84944765  0.77836116  0.2021178 ]
     [ 0.23664507  0.53484759  0.          1.          0.1196722 ]]


#### 21. Multiply a 5x3 matrix by a 3x2 matrix (real matrix product) 
```python
Z= np.dot(np.ones((5,3)), np.ones((3,2)))
print (Z)
```

    [[ 3.  3.]
     [ 3.  3.]
     [ 3.  3.]
     [ 3.  3.]
     [ 3.  3.]]


#### 22. Create a 5x5 matrix with row values ranging from 0 to 4

```python
Z = np.zeros((5,5))
Z += np.arange(5)
print(Z)
```

    [[ 0.  1.  2.  3.  4.]
     [ 0.  1.  2.  3.  4.]
     [ 0.  1.  2.  3.  4.]
     [ 0.  1.  2.  3.  4.]
     [ 0.  1.  2.  3.  4.]]


#### 23. Consider a generator function that generates 10 integers and use it to build an array 
```python


def generate(): 
    for x in range(10):
        yield x
        
Z = np.fromiter(generate(), dtype=float, count=-1)
print (Z)
```

    [ 0.  1.  2.  3.  4.  5.  6.  7.  8.  9.]


#### 24. Create a vector of size 10 with values ranging from 0 to 1, both excluded
```python

Z = np.linspace(0,1,12,endpoint=True)[1:-1]
print(Z)
```

    [ 0.09090909  0.18181818  0.27272727  0.36363636  0.45454545  0.54545455
      0.63636364  0.72727273  0.81818182  0.90909091]


#### 25. Create a random vector of size 10 and sort it

```python
Z = np.random.random(10)
Z.sort()
print(Z)
```

    [ 0.15503078  0.21692999  0.21737132  0.37907414  0.51967447  0.63376326
      0.6803677   0.73890984  0.76585383  0.92828094]


#### 26. Consider two random array A anb B, check if they are equal 

```python

A = np.random.randint(0,2,5)
B = np.random.randint(0,2,5)
equal = np.allclose(A,B)
print(equal)
```

    False


#### 27. Make an array immutable (read-only) 

```python
Z = np.zeros(10)
Z.flags.writeable = False
Z[0] = 1
```


    ---------------------------------------------------------------------------

    ValueError                                Traceback (most recent call last)

    <ipython-input-44-aed29e88d03e> in <module>()
          2 Z = np.zeros(10)
          3 Z.flags.writeable = False
    ----> 4 Z[0] = 1
    

    ValueError: assignment destination is read-only


#### 28. Consider a random 10x2 matrix representing cartesian coordinates, convert them to polar coordinates

```python
Z = np.random.random((10,2))
X,Y = Z[:,0], Z[:,1]
R = np.sqrt(X**2+Y**2)
T = np.arctan2(Y,X)
print(R)
print(T)
```

    [ 0.96250123  0.6506005   0.54491442  0.98320135  1.07436851  0.86960498
      0.84590016  0.74984671  0.83892943  1.31286586]
    [ 0.5626358   1.52768329  1.46410864  0.63104892  0.6793132   1.13706692
      0.09305951  1.06856493  0.58647074  0.70543732]


#### 29. Create random vector of size 10 and replace the maximum value by 0

```python
Z = np.random.random(10)
Z[Z.argmax()] = 0
print(Z)
```

    [ 0.7128594   0.16541996  0.17981044  0.76582971  0.34887033  0.23396711
      0.48205275  0.57696376  0.67187429  0.        ]


#### 30. Create a structured array with x and y coordinates covering the [0,1]x[0,1] area 
```python

Z = np.zeros((10,10), [('x',float),('y',float)])
Z['x'], Z['y'] = np.meshgrid(np.linspace(0,1,10),
                             np.linspace(0,1,10))
print(Z)
```

    [[(0.0, 0.0) (0.1111111111111111, 0.0) (0.2222222222222222, 0.0)
      (0.3333333333333333, 0.0) (0.4444444444444444, 0.0)
      (0.5555555555555556, 0.0) (0.6666666666666666, 0.0)
      (0.7777777777777777, 0.0) (0.8888888888888888, 0.0) (1.0, 0.0)]
     [(0.0, 0.1111111111111111) (0.1111111111111111, 0.1111111111111111)
      (0.2222222222222222, 0.1111111111111111)
      (0.3333333333333333, 0.1111111111111111)
      (0.4444444444444444, 0.1111111111111111)
      (0.5555555555555556, 0.1111111111111111)
      (0.6666666666666666, 0.1111111111111111)
      (0.7777777777777777, 0.1111111111111111)
      (0.8888888888888888, 0.1111111111111111) (1.0, 0.1111111111111111)]
     [(0.0, 0.2222222222222222) (0.1111111111111111, 0.2222222222222222)
      (0.2222222222222222, 0.2222222222222222)
      (0.3333333333333333, 0.2222222222222222)
      (0.4444444444444444, 0.2222222222222222)
      (0.5555555555555556, 0.2222222222222222)
      (0.6666666666666666, 0.2222222222222222)
      (0.7777777777777777, 0.2222222222222222)
      (0.8888888888888888, 0.2222222222222222) (1.0, 0.2222222222222222)]
     [(0.0, 0.3333333333333333) (0.1111111111111111, 0.3333333333333333)
      (0.2222222222222222, 0.3333333333333333)
      (0.3333333333333333, 0.3333333333333333)
      (0.4444444444444444, 0.3333333333333333)
      (0.5555555555555556, 0.3333333333333333)
      (0.6666666666666666, 0.3333333333333333)
      (0.7777777777777777, 0.3333333333333333)
      (0.8888888888888888, 0.3333333333333333) (1.0, 0.3333333333333333)]
     [(0.0, 0.4444444444444444) (0.1111111111111111, 0.4444444444444444)
      (0.2222222222222222, 0.4444444444444444)
      (0.3333333333333333, 0.4444444444444444)
      (0.4444444444444444, 0.4444444444444444)
      (0.5555555555555556, 0.4444444444444444)
      (0.6666666666666666, 0.4444444444444444)
      (0.7777777777777777, 0.4444444444444444)
      (0.8888888888888888, 0.4444444444444444) (1.0, 0.4444444444444444)]
     [(0.0, 0.5555555555555556) (0.1111111111111111, 0.5555555555555556)
      (0.2222222222222222, 0.5555555555555556)
      (0.3333333333333333, 0.5555555555555556)
      (0.4444444444444444, 0.5555555555555556)
      (0.5555555555555556, 0.5555555555555556)
      (0.6666666666666666, 0.5555555555555556)
      (0.7777777777777777, 0.5555555555555556)
      (0.8888888888888888, 0.5555555555555556) (1.0, 0.5555555555555556)]
     [(0.0, 0.6666666666666666) (0.1111111111111111, 0.6666666666666666)
      (0.2222222222222222, 0.6666666666666666)
      (0.3333333333333333, 0.6666666666666666)
      (0.4444444444444444, 0.6666666666666666)
      (0.5555555555555556, 0.6666666666666666)
      (0.6666666666666666, 0.6666666666666666)
      (0.7777777777777777, 0.6666666666666666)
      (0.8888888888888888, 0.6666666666666666) (1.0, 0.6666666666666666)]
     [(0.0, 0.7777777777777777) (0.1111111111111111, 0.7777777777777777)
      (0.2222222222222222, 0.7777777777777777)
      (0.3333333333333333, 0.7777777777777777)
      (0.4444444444444444, 0.7777777777777777)
      (0.5555555555555556, 0.7777777777777777)
      (0.6666666666666666, 0.7777777777777777)
      (0.7777777777777777, 0.7777777777777777)
      (0.8888888888888888, 0.7777777777777777) (1.0, 0.7777777777777777)]
     [(0.0, 0.8888888888888888) (0.1111111111111111, 0.8888888888888888)
      (0.2222222222222222, 0.8888888888888888)
      (0.3333333333333333, 0.8888888888888888)
      (0.4444444444444444, 0.8888888888888888)
      (0.5555555555555556, 0.8888888888888888)
      (0.6666666666666666, 0.8888888888888888)
      (0.7777777777777777, 0.8888888888888888)
      (0.8888888888888888, 0.8888888888888888) (1.0, 0.8888888888888888)]
     [(0.0, 1.0) (0.1111111111111111, 1.0) (0.2222222222222222, 1.0)
      (0.3333333333333333, 1.0) (0.4444444444444444, 1.0)
      (0.5555555555555556, 1.0) (0.6666666666666666, 1.0)
      (0.7777777777777777, 1.0) (0.8888888888888888, 1.0) (1.0, 1.0)]]


#### 31. Print the minimum and maximum representable value for each numpy scalar type

```python
for dtype in [np.int8, np.int32, np.int64]:
   print(np.iinfo(dtype).min)
   print(np.iinfo(dtype).max)
for dtype in [np.float32, np.float64]:
   print(np.finfo(dtype).min)
   print(np.finfo(dtype).max)
   print(np.finfo(dtype).eps)
```

    -128
    127
    -2147483648
    2147483647
    -9223372036854775808
    9223372036854775807
    -3.40282e+38
    3.40282e+38
    1.19209e-07
    -1.79769313486e+308
    1.79769313486e+308
    2.22044604925e-16


#### 32. How to print all the values of an array ?

```python
np.set_printoptions(threshold=np.nan)
Z = np.zeros((25,25))
print(Z)
```

    [[ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]]


#### 33. How to print all the values of an array ? 

```python
np.set_printoptions(threshold=np.nan)
Z = np.zeros((25,25))
print(Z)
```

    [[ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
       0.  0.  0.  0.  0.  0.  0.]]


#### 34. How to find the closest value (to a given scalar) in an array ?

```python
Z = np.arange(100)
v = np.random.uniform(0,100)
index = (np.abs(Z-v)).argmin()
print(Z[index])
```

    39


#### 35. Create a structured array representing a position (x,y) and a color (r,g,b) 

```python

Z = np.zeros(10, [ ('position', [ ('x', float, 1),
                                   ('y', float, 1)]),
                    ('color',    [ ('r', float, 1),
                                   ('g', float, 1),
                                   ('b', float, 1)])])
print(Z)
```

    [((0.0, 0.0), (0.0, 0.0, 0.0)) ((0.0, 0.0), (0.0, 0.0, 0.0))
     ((0.0, 0.0), (0.0, 0.0, 0.0)) ((0.0, 0.0), (0.0, 0.0, 0.0))
     ((0.0, 0.0), (0.0, 0.0, 0.0)) ((0.0, 0.0), (0.0, 0.0, 0.0))
     ((0.0, 0.0), (0.0, 0.0, 0.0)) ((0.0, 0.0), (0.0, 0.0, 0.0))
     ((0.0, 0.0), (0.0, 0.0, 0.0)) ((0.0, 0.0), (0.0, 0.0, 0.0))]


#### 36. Consider a random vector with shape (100,2) representing coordinates, find point by point distances 

```python
Z = np.random.random((10,2))
X,Y = np.atleast_2d(Z[:,0]), np.atleast_2d(Z[:,1])
D = np.sqrt( (X-X.T)**2 + (Y-Y.T)**2)
print(D)

# Much faster with scipy
import scipy
# Thanks Gavin Heverly-Coulson (#issue 1)
import scipy.spatial

Z = np.random.random((10,2))
D = scipy.spatial.distance.cdist(Z,Z)
print(D)
```

    [[ 0.          0.16041826  0.39636148  0.27970931  0.94692641  0.88158332
       0.72715837  0.27128984  0.13970092  0.10537411]
     [ 0.16041826  0.          0.55193698  0.13301653  0.99254187  0.94895555
       0.61672741  0.13961365  0.04171497  0.07104601]
     [ 0.39636148  0.55193698  0.          0.64959668  0.83315211  0.71746254
       0.99381777  0.66653112  0.52147916  0.48504053]
     [ 0.27970931  0.13301653  0.64959668  0.          0.96823391  0.94428708
       0.49051271  0.18607388  0.14019171  0.17473144]
     [ 0.94692641  0.99254187  0.83315211  0.96823391  0.          0.14703709
       0.86081906  1.12595803  0.95240267  0.93812413]
     [ 0.88158332  0.94895555  0.71746254  0.94428708  0.14703709  0.
       0.91397702  1.08672309  0.90758168  0.88838743]
     [ 0.72715837  0.61672741  0.99381777  0.49051271  0.86081906  0.91397702
       0.          0.66089153  0.60712435  0.63055399]
     [ 0.27128984  0.13961365  0.66653112  0.18607388  1.12595803  1.08672309
       0.66089153  0.          0.18128976  0.20768971]
     [ 0.13970092  0.04171497  0.52147916  0.14019171  0.95240267  0.90758168
       0.60712435  0.18128976  0.          0.03660311]
     [ 0.10537411  0.07104601  0.48504053  0.17473144  0.93812413  0.88838743
       0.63055399  0.20768971  0.03660311  0.        ]]
    [[ 0.          0.41669386  0.63884591  0.21273244  0.93419298  0.9354571
       0.75385026  0.54378435  0.76137823  0.76418316]
     [ 0.41669386  0.          0.47848982  0.20786556  0.56743667  0.54535479
       0.51299783  0.32729405  0.43409123  0.46643795]
     [ 0.63884591  0.47848982  0.          0.49753799  0.46613739  0.53004291
       0.15144258  0.80532512  0.86355555  0.91160241]
     [ 0.21273244  0.20786556  0.49753799  0.          0.72934465  0.72524314
       0.58603576  0.41999752  0.59916511  0.61577691]
     [ 0.93419298  0.56743667  0.46613739  0.72934465  0.          0.09813358
       0.32877389  0.79791639  0.71523401  0.7794757 ]
     [ 0.9354571   0.54535479  0.53004291  0.72524314  0.09813358  0.
       0.40469695  0.7418739   0.63706066  0.70213718]
     [ 0.75385026  0.51299783  0.15144258  0.58603576  0.32877389  0.40469695
       0.          0.82684606  0.84126655  0.89619327]
     [ 0.54378435  0.32729405  0.80532512  0.41999752  0.79791639  0.7418739
       0.82684606  0.          0.2440196   0.22727428]
     [ 0.76137823  0.43409123  0.86355555  0.59916511  0.71523401  0.63706066
       0.84126655  0.2440196   0.          0.06546317]
     [ 0.76418316  0.46643795  0.91160241  0.61577691  0.7794757   0.70213718
       0.89619327  0.22727428  0.06546317  0.        ]]


#### 37. How to convert a float (32 bits) array into an integer (32 bits) in place ?

```python
Z = np.arange(10, dtype=np.int32)
Z = Z.astype(np.float32, copy=False)
```

#### 38. Consider the following file:
```
1,2,3,4,5
6,,,7,8
,,9,10,11
```
How to read it?


```python
Z = np.genfromtxt("missing.dat", delimiter=",")
```


```python
#### 39 .What is the equivalent of enumerate for numpy arrays ? 
Z = np.arange(9).reshape(3,3)
for index, value in np.ndenumerate(Z):
    print(index, value)
for index in np.ndindex(Z.shape):
    print(index, Z[index])
```

    (0, 0) 0
    (0, 1) 1
    (0, 2) 2
    (1, 0) 3
    (1, 1) 4
    (1, 2) 5
    (2, 0) 6
    (2, 1) 7
    (2, 2) 8
    (0, 0) 0
    (0, 1) 1
    (0, 2) 2
    (1, 0) 3
    (1, 1) 4
    (1, 2) 5
    (2, 0) 6
    (2, 1) 7
    (2, 2) 8


#### 40. Generate a generic 2D Gaussian-like array

```python
X, Y = np.meshgrid(np.linspace(-1,1,10), np.linspace(-1,1,10))
D = np.sqrt(X*X+Y*Y)
sigma, mu = 1.0, 0.0
G = np.exp(-( (D-mu)**2 / ( 2.0 * sigma**2 ) ) )
print(G)
```

    [[ 0.36787944  0.44822088  0.51979489  0.57375342  0.60279818  0.60279818
       0.57375342  0.51979489  0.44822088  0.36787944]
     [ 0.44822088  0.54610814  0.63331324  0.69905581  0.73444367  0.73444367
       0.69905581  0.63331324  0.54610814  0.44822088]
     [ 0.51979489  0.63331324  0.73444367  0.81068432  0.85172308  0.85172308
       0.81068432  0.73444367  0.63331324  0.51979489]
     [ 0.57375342  0.69905581  0.81068432  0.89483932  0.9401382   0.9401382
       0.89483932  0.81068432  0.69905581  0.57375342]
     [ 0.60279818  0.73444367  0.85172308  0.9401382   0.98773022  0.98773022
       0.9401382   0.85172308  0.73444367  0.60279818]
     [ 0.60279818  0.73444367  0.85172308  0.9401382   0.98773022  0.98773022
       0.9401382   0.85172308  0.73444367  0.60279818]
     [ 0.57375342  0.69905581  0.81068432  0.89483932  0.9401382   0.9401382
       0.89483932  0.81068432  0.69905581  0.57375342]
     [ 0.51979489  0.63331324  0.73444367  0.81068432  0.85172308  0.85172308
       0.81068432  0.73444367  0.63331324  0.51979489]
     [ 0.44822088  0.54610814  0.63331324  0.69905581  0.73444367  0.73444367
       0.69905581  0.63331324  0.54610814  0.44822088]
     [ 0.36787944  0.44822088  0.51979489  0.57375342  0.60279818  0.60279818
       0.57375342  0.51979489  0.44822088  0.36787944]]


#### 41. How to randomly place p elements in a 2D array ? 

```python
n = 10
p = 3
Z = np.zeros((n,n))
np.put(Z, np.random.choice(range(n*n), p, replace=False),1)
print (Z)
```

    [[ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.]
     [ 0.  1.  0.  0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  1.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  1.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.]
     [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.]]


#### 42. Subtract the mean of each row of a matrix 

```python
X = np.random.rand(5, 10)

# Recent versions of numpy
Y = X - X.mean(axis=1, keepdims=True)

# Older versions of numpy
Y = X - X.mean(axis=1).reshape(-1, 1)
Y

```




    array([[-0.41712619, -0.31625791,  0.0709978 , -0.34058458, -0.13434146,
             0.43301438,  0.03521052,  0.16470569,  0.34901327,  0.15536847],
           [-0.05956321,  0.04384183,  0.33452578,  0.33625217,  0.11357225,
             0.0933623 , -0.56757585, -0.30446339, -0.36167976,  0.37172787],
           [-0.02549006,  0.03284777, -0.61508089, -0.12372374,  0.34520421,
            -0.11325088,  0.19232351, -0.27531168,  0.27524018,  0.30724158],
           [-0.6495722 ,  0.15249729,  0.24415751, -0.03699675, -0.45176077,
             0.28232174,  0.27590372,  0.28603507, -0.4057478 ,  0.30316218],
           [-0.34662175,  0.34142956,  0.15902326,  0.23408754,  0.25591137,
            -0.30250848, -0.1511863 , -0.18736202, -0.40147969,  0.39870651]])



#### 43. How to I sort an array by the nth column ?

```python
Z = np.random.randint(0,10,(3,3))
print(Z)
print(Z[Z[:,1].argsort()])
```

    [[8 9 1]
     [0 6 0]
     [5 1 4]]
    [[5 1 4]
     [0 6 0]
     [8 9 1]]


#### 44. How to tell if a given 2D array has null columns ?

```python
Z = np.random.randint(0,3,(3,10))
print((~Z.any(axis=0)).any())

```

    False


#### 45. Find the nearest value from a given value in an array

```python
Z = np.random.uniform(0,1,10)
z = 0.5
m = Z.flat[np.abs(Z - z).argmin()]
print(m)

```

    0.507587170197


#### 46. Consider a given vector, how to add 1 to each element indexed by a second vector (be careful with repeated indices) ?

```python
Z = np.ones(10)
I = np.random.randint(0,len(Z),20)
Z += np.bincount(I, minlength=len(Z))
print(Z)

```

    [ 4.  2.  5.  1.  4.  3.  3.  2.  3.  3.]


#### 47. How to accumulate elements of a vector (X) to an array (F) based on an index list (I) ?

```python
X = [1,2,3,4,5,6]
I = [1,3,9,3,4,1]
F = np.bincount(I,X)
print(F)
```

    [ 0.  7.  0.  6.  5.  0.  0.  0.  0.  3.]


#### 48. Considering a (w,h,3) image of (dtype=ubyte), compute the number of unique colors 

```python
w,h = 16,16
I = np.random.randint(0,2,(h,w,3)).astype(np.ubyte)
F = I[...,0]*256*256 + I[...,1]*256 +I[...,2]
n = len(np.unique(F))
print(np.unique(I))
```

    [0 1]


#### 49. Considering a four dimensions array, how to get sum over the last two axis at once ?

```python
A = np.random.randint(0,10,(3,4,3,4))
sum = A.reshape(A.shape[:-2] + (-1,)).sum(axis=-1)
print(sum)
```

    [[55 50 64 48]
     [50 46 42 51]
     [46 50 54 45]]


#### 50. Considering a one-dimensional vector D, how to compute means of subsets of D using a vector S of same size describing subset indices?

```python

D = np.random.uniform(0,1,100)
S = np.random.randint(0,10,100)
D_sums = np.bincount(S, weights=D)
D_counts = np.bincount(S)
D_means = D_sums / D_counts
print(D_means)
```

    [ 0.42643508  0.33291546  0.63718304  0.43905364  0.47824262  0.37712373
      0.48964857  0.38070623  0.36374802  0.71542702]


#### 51. How to get the diagonal of a dot product ?

```python
A = np.random.randint(0,10,(3,3))
B= np.random.randint(0,10,(3,3))
#Slow version

np.diag(np.dot(A, B))

# Fast version
np.sum(A * B.T, axis=1)

# Faster version
np.einsum("ij,ji->i", A, B)
```




    array([ 53, 125,  16])



#### 52. Consider the vector [1, 2, 3, 4, 5], how to build a new vector with 3 consecutive zeros interleaved between each value ?

```python

Z = np.array([1,2,3,4,5])
nz = 3
Z0 = np.zeros(len(Z) + (len(Z)-1)*(nz))
Z0[::nz+1] = Z
print(Z0)
```

    [ 1.  0.  0.  0.  2.  0.  0.  0.  3.  0.  0.  0.  4.  0.  0.  0.  5.]


#### 53. Consider an array of dimension (5,5,3), how to mulitply it by an array with dimensions (5,5) ?

```python
A = np.ones((5,5,3))
B = 2*np.ones((5,5))
print(A * B[:,:,None])
```

    [[[ 2.  2.  2.]
      [ 2.  2.  2.]
      [ 2.  2.  2.]
      [ 2.  2.  2.]
      [ 2.  2.  2.]]
    
     [[ 2.  2.  2.]
      [ 2.  2.  2.]
      [ 2.  2.  2.]
      [ 2.  2.  2.]
      [ 2.  2.  2.]]
    
     [[ 2.  2.  2.]
      [ 2.  2.  2.]
      [ 2.  2.  2.]
      [ 2.  2.  2.]
      [ 2.  2.  2.]]
    
     [[ 2.  2.  2.]
      [ 2.  2.  2.]
      [ 2.  2.  2.]
      [ 2.  2.  2.]
      [ 2.  2.  2.]]
    
     [[ 2.  2.  2.]
      [ 2.  2.  2.]
      [ 2.  2.  2.]
      [ 2.  2.  2.]
      [ 2.  2.  2.]]]


#### 54. How to swap two rows of an array ?

```python
A = np.arange(25).reshape(5,5)
A[[0,1]] = A[[1,0]]
print(A)

```

    [[ 5  6  7  8  9]
     [ 0  1  2  3  4]
     [10 11 12 13 14]
     [15 16 17 18 19]
     [20 21 22 23 24]]


#### 55. Consider a set of 10 triplets describing 10 triangles (with shared vertices), find the set of unique line segments composing all the triangle

```python
faces = np.random.randint(0,100,(10,3))
F = np.roll(faces.repeat(2,axis=1),-1,axis=1)
F = F.reshape(len(F)*3,2)
F = np.sort(F,axis=1)
G = F.view( dtype=[('p0',F.dtype),('p1',F.dtype)] )
G = np.unique(G)
print(G)
```

    [(0, 1) (0, 29) (1, 29) (4, 45) (4, 67) (7, 43) (7, 48) (7, 82) (7, 88)
     (10, 26) (10, 52) (17, 42) (17, 58) (26, 52) (30, 47) (30, 97) (42, 58)
     (43, 82) (45, 67) (47, 57) (47, 90) (47, 97) (48, 88) (53, 54) (53, 83)
     (54, 83) (57, 90) (62, 73) (62, 81) (73, 81)]


#### 56. Given an array C that is a bincount, how to produce an array A such that np.bincount(A) == C ?

```python
C = np.bincount([1,1,2,3,4,4,6])
A = np.repeat(np.arange(len(C)), C)
print(A)
```

    [1 1 2 3 4 4 6]


#### 57. How to compute averages using a sliding window over an array ? 

```python
def moving_average(a, n=3) :
    ret = np.cumsum(a, dtype=float)
    ret[n:] = ret[n:] - ret[:-n]
    return ret[n - 1:] / n
Z = np.arange(20)
print(moving_average(Z, n=3))
```

    [  1.   2.   3.   4.   5.   6.   7.   8.   9.  10.  11.  12.  13.  14.  15.
      16.  17.  18.]


#### 58. Consider a one-dimensional array Z, build a two-dimensional array whose first row is (Z[0],Z[1],Z[2]) and each subsequent row is shifted by 1 (last row should be (Z[-3],Z[-2],Z[-1]) 
```python

def rolling(a, window):
    shape = (a.size - window + 1, window)
    strides = (a.itemsize, a.itemsize)
    return np.lib.stride_tricks.as_strided(a, shape=shape, strides=strides)
Z = rolling(np.arange(10), 3)
print(Z)
```

    [[0 1 2]
     [1 2 3]
     [2 3 4]
     [3 4 5]
     [4 5 6]
     [5 6 7]
     [6 7 8]
     [7 8 9]]


#### 59. How to negate a boolean, or to change the sign of a float inplace ?

```python
Z = np.random.randint(0,2,100)
print ('original: ')
print (Z)
print('Negating a boolean: ')
print(np.logical_not(Z, out=Z))


Z = np.random.uniform(-1.0,1.0,10)
print ('original: ')
print (Z)
print ('Change the sign of float inplace: ')
print(np.negative(Z, out=Z))
```

    original: 
    [1 0 1 1 0 1 0 1 0 1 0 0 1 0 0 1 1 0 0 1 1 1 0 0 0 1 0 0 1 0 1 1 1 1 0 0 0
     1 1 0 1 0 0 0 0 0 1 0 1 1 1 0 1 0 1 0 0 0 0 1 1 0 0 0 0 1 1 0 0 1 1 1 0 1
     0 1 0 0 0 0 0 1 0 1 1 0 1 1 1 0 0 0 1 1 0 1 1 0 0 1]
    Negating a boolean: 
    [0 1 0 0 1 0 1 0 1 0 1 1 0 1 1 0 0 1 1 0 0 0 1 1 1 0 1 1 0 1 0 0 0 0 1 1 1
     0 0 1 0 1 1 1 1 1 0 1 0 0 0 1 0 1 0 1 1 1 1 0 0 1 1 1 1 0 0 1 1 0 0 0 1 0
     1 0 1 1 1 1 1 0 1 0 0 1 0 0 0 1 1 1 0 0 1 0 0 1 1 0]
    original: 
    [-0.87224321  0.58136951  0.50505371 -0.48854479  0.31228199  0.55196573
     -0.81038165  0.45321936  0.98967548  0.17369688]
    Change the sign of float inplace: 
    [ 0.87224321 -0.58136951 -0.50505371  0.48854479 -0.31228199 -0.55196573
      0.81038165 -0.45321936 -0.98967548 -0.17369688]


#### 60. Consider 2 sets of points P0,P1 describing lines (2d) and a point p, how to compute distance from p to each line i (P0[i],P1[i]) ?

```python

def distance(P0, P1, p):
    T = P1 - P0
    L = (T**2).sum(axis=1)
    U = -((P0[:,0]-p[...,0])*T[:,0] + (P0[:,1]-p[...,1])*T[:,1]) / L
    U = U.reshape(len(U),1)
    D = P0 + U*T - p
    return np.sqrt((D**2).sum(axis=1))

P0 = np.random.uniform(-10,10,(10,2))
P1 = np.random.uniform(-10,10,(10,2))
p  = np.random.uniform(-10,10,( 1,2))
print(distance(P0, P1, p))
```

    [ 15.67392313   1.46091357   4.505239     1.10632792   2.32728862
       9.85572999   1.63378493   5.57516785   1.46341974   4.00922863]


#### 61. Consider 2 sets of points P0,P1 describing lines (2d) and a set of points P, how to compute distance from each point j (P[j]) to each line i (P0[i],P1[i]) ?

```python

P0 = np.random.uniform(-10, 10, (5,2))
P1 = np.random.uniform(-10,10,(5,2))
p = np.random.uniform(-10, 10, (5,2))
print (np.array([distance(P0,P1,p_i) for p_i in p]))
```

    [[  0.4054967    2.1068118    0.58003515   5.81257863   3.78192838]
     [  5.50377781   0.73285491   2.24238531   8.35353585  10.29310718]
     [  1.43607234   4.37599484   1.6638239    7.97693548   3.35590912]
     [  4.75104221   5.75454658   8.44481523   0.52972808   7.13454355]
     [  5.57737574   0.69984506   2.27839466   8.36475788  10.36864384]]


#### 62. Consider an arbitrary array, write a function that extract a subpart with a fixed shape and centered on a given element (pad with a fill value when necessary) 

```python
Z = np.random.randint(0,10,(10,10))
shape = (5,5)
fill  = 0
position = (1,1)

R = np.ones(shape, dtype=Z.dtype)*fill
P  = np.array(list(position)).astype(int)
Rs = np.array(list(R.shape)).astype(int)
Zs = np.array(list(Z.shape)).astype(int)

R_start = np.zeros((len(shape),)).astype(int)
R_stop  = np.array(list(shape)).astype(int)
Z_start = (P-Rs//2)
Z_stop  = (P+Rs//2)+Rs%2

R_start = (R_start - np.minimum(Z_start,0)).tolist()
Z_start = (np.maximum(Z_start,0)).tolist()
R_stop = np.maximum(R_start, (R_stop - np.maximum(Z_stop-Zs,0))).tolist()
Z_stop = (np.minimum(Z_stop,Zs)).tolist()

r = [slice(start,stop) for start,stop in zip(R_start,R_stop)]
z = [slice(start,stop) for start,stop in zip(Z_start,Z_stop)]
R[r] = Z[z]
print(Z)
print(R)
```

    [[0 1 3 1 7 0 2 7 5 2]
     [9 4 1 1 2 3 5 5 8 8]
     [8 6 6 3 2 1 6 9 9 9]
     [7 5 1 3 7 6 9 4 2 8]
     [6 2 0 2 2 7 7 2 0 3]
     [7 9 3 1 2 2 8 3 6 1]
     [3 2 2 5 9 8 5 9 1 5]
     [8 0 9 2 1 1 3 8 7 8]
     [9 8 4 6 9 7 3 4 5 8]
     [0 5 5 5 8 8 1 5 5 8]]
    [[0 0 0 0 0]
     [0 0 1 3 1]
     [0 9 4 1 1]
     [0 8 6 6 3]
     [0 7 5 1 3]]


#### 63. Consider an array Z = [1,2,3,4,5,6,7,8,9,10,11,12,13,14], how to generate an array R = [[1,2,3,4], [2,3,4,5], [3,4,5,6], ..., [11,12,13,14]] ?

```python

Z = np.arange(1,15,dtype=int)

def rolling(a, window):
    shape = (a.size - window + 1, window)
    strides = (a.itemsize, a.itemsize)
    return np.lib.stride_tricks.as_strided(a, shape=shape, strides=strides)
R = rolling(Z, 4)
print ('original: ')
print (Z)
print ('after strides: ')
print(R)
```

    original: 
    [ 1  2  3  4  5  6  7  8  9 10 11 12 13 14]
    after strides: 
    [[ 1  2  3  4]
     [ 2  3  4  5]
     [ 3  4  5  6]
     [ 4  5  6  7]
     [ 5  6  7  8]
     [ 6  7  8  9]
     [ 7  8  9 10]
     [ 8  9 10 11]
     [ 9 10 11 12]
     [10 11 12 13]
     [11 12 13 14]]


#### 64. Compute a matrix rank

```python
Z = np.random.uniform(0,1,(10,10))
U, S, V = np.linalg.svd(Z) # Singular Value Decomposition
rank = np.sum(S > 1e-10)
print (rank)
```

    10


#### 65. How to find the most frequent value in an array ?

```python
Z = np.random.randint(0,10,50)
print (Z)
print('rank:', np.bincount(Z).argmax())
```

    [5 5 8 9 6 8 6 7 6 3 9 3 8 8 7 3 0 8 4 0 1 3 2 4 0 7 9 1 4 8 9 0 4 5 8 7 1
     9 7 0 6 8 8 9 7 1 0 5 6 8]
    rank: 8


#### 66. Extract all the contiguous 3x3 blocks from a random 6x6 matrix 

```python

Z = np.random.randint(0,5,(6,6))
n = 3
i = 1 + (Z.shape[0]-3)
j = 1 + (Z.shape[1]-3)
C = np.lib.stride_tricks.as_strided(Z, shape=(i, j, n, n), strides=Z.strides + Z.strides)
print(C)
```

    [[[[0 4 1]
       [2 0 4]
       [0 3 3]]
    
      [[4 1 3]
       [0 4 3]
       [3 3 1]]
    
      [[1 3 0]
       [4 3 3]
       [3 1 2]]
    
      [[3 0 2]
       [3 3 1]
       [1 2 4]]]
    
    
     [[[2 0 4]
       [0 3 3]
       [3 4 1]]
    
      [[0 4 3]
       [3 3 1]
       [4 1 2]]
    
      [[4 3 3]
       [3 1 2]
       [1 2 1]]
    
      [[3 3 1]
       [1 2 4]
       [2 1 1]]]
    
    
     [[[0 3 3]
       [3 4 1]
       [4 1 4]]
    
      [[3 3 1]
       [4 1 2]
       [1 4 1]]
    
      [[3 1 2]
       [1 2 1]
       [4 1 4]]
    
      [[1 2 4]
       [2 1 1]
       [1 4 0]]]
    
    
     [[[3 4 1]
       [4 1 4]
       [1 0 1]]
    
      [[4 1 2]
       [1 4 1]
       [0 1 2]]
    
      [[1 2 1]
       [4 1 4]
       [1 2 4]]
    
      [[2 1 1]
       [1 4 0]
       [2 4 2]]]]


#### 67. Create a 2D array subclass such that Z[i,j] == Z[j,i]

```python
class Symetric(np.ndarray):
    def __setitem__(self, (i,j), value):
        super(Symetric, self).__setitem__((i,j), value)
        super(Symetric, self).__setitem__((j,i), value)

def symetric(Z):
    return np.asarray(Z + Z.T - np.diag(Z.diagonal())).view(Symetric)

S = symetric(np.random.randint(0,10,(5,5)))
S[2,3] = 42
print(S)
```


      File "<ipython-input-127-d3d1b4e8c4de>", line 3
        def __setitem__(self, (i,j), value):
                              ^
    SyntaxError: invalid syntax



#### 68. Consider a set of p matrices wich shape (n,n) and a set of p vectors with shape (n,1). How to compute the sum of of the p matrix products at once ? (result has shape (n,1))
```python

p, n = 10, 20
M = np.ones((p,n,n))
V = np.ones((p,n,1))
S = np.tensordot(M, V, axes=[[0, 2], [0, 1]])
print(S)

# It works, because:
# M is (p,n,n)
# V is (p,n,1)
# Thus, summing over the paired axes 0 and 0 (of M and V independently),
# and 2 and 1, to remain with a (n,1) vector.
```

    [[ 200.]
     [ 200.]
     [ 200.]
     [ 200.]
     [ 200.]
     [ 200.]
     [ 200.]
     [ 200.]
     [ 200.]
     [ 200.]
     [ 200.]
     [ 200.]
     [ 200.]
     [ 200.]
     [ 200.]
     [ 200.]
     [ 200.]
     [ 200.]
     [ 200.]
     [ 200.]]


#### 69. Consider a 16x16 array, how to get the block-sum (block size is 4x4) ?

```python
Z = np.ones((16,16))
k = 4
S = np.add.reduceat(np.add.reduceat(Z, np.arange(0, Z.shape[0], k), axis=0),
                                       np.arange(0, Z.shape[1], k), axis=1)
print ('input array')
print (Z)
print ('block sum')
print (S)
```

    input array
    [[ 1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.]
     [ 1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.]
     [ 1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.]
     [ 1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.]
     [ 1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.]
     [ 1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.]
     [ 1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.]
     [ 1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.]
     [ 1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.]
     [ 1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.]
     [ 1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.]
     [ 1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.]
     [ 1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.]
     [ 1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.]
     [ 1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.]
     [ 1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.]]
    block sum
    [[ 16.  16.  16.  16.]
     [ 16.  16.  16.  16.]
     [ 16.  16.  16.  16.]
     [ 16.  16.  16.  16.]]


#### 70. How to implement the Game of Life using numpy arrays ?

```python
# Author: Nicolas Rougier
def iterate(Z):
    # Count neighbours
    N = (Z[0:-2,0:-2] + Z[0:-2,1:-1] + Z[0:-2,2:] +
         Z[1:-1,0:-2]                + Z[1:-1,2:] +
         Z[2:  ,0:-2] + Z[2:  ,1:-1] + Z[2:  ,2:])

    # Apply rules
    birth = (N==3) & (Z[1:-1,1:-1]==0)
    survive = ((N==2) | (N==3)) & (Z[1:-1,1:-1]==1)
    Z[...] = 0
    Z[1:-1,1:-1][birth | survive] = 1
    return Z

Z = np.random.randint(0,2,(50,50))
for i in range(100): Z = iterate(Z)

```

#### 71. How to get the n largest values of an array 

```python
Z = np.arange(10000)
np.random.shuffle(Z)
n = 5

# Slow
print (Z[np.argsort(Z)[-n:]])

# Fast
print (Z[np.argpartition(-Z,n)[:n]])
```

    [9995 9996 9997 9998 9999]
    [9996 9999 9997 9998 9995]


#### 72. Given an arbitrary number of vectors, build the cartesian product (every combinations of every item) 

```python
def cartesian(arrays):
    arrays = [np.asarray(a) for a in arrays]
    shape = (len(x) for x in arrays)

    ix = np.indices(shape, dtype=int)
    ix = ix.reshape(len(arrays), -1).T

    for n, arr in enumerate(arrays):
        ix[:, n] = arrays[n][ix[:, n]]

    return ix

print (cartesian(([1, 2, 3], [4, 5], [6, 7])))
```

    [[1 4 6]
     [1 4 7]
     [1 5 6]
     [1 5 7]
     [2 4 6]
     [2 4 7]
     [2 5 6]
     [2 5 7]
     [3 4 6]
     [3 4 7]
     [3 5 6]
     [3 5 7]]


#### 73. How to create a record array from a regular array ?

```python
Z = np.array([("Hello", 2.5, 3),
              ("World", 3.6, 2)])
R = np.core.records.fromarrays(Z.T,
                               names='col1, col2, col3',
                               formats = 'S8, f8, i8')

```

#### 74. Consider a large vector Z, compute Z to the power of 3 using 3 different methods 

```python
x = np.random.rand(5e7)

%timeit np.power(x,3)
%timeit x*x*x
%timeit np.einsum('i,i,i->i',x,x,x)

```

    1 loops, best of 3: 1.53 s per loop
    1 loops, best of 3: 528 ms per loop
    1 loops, best of 3: 286 ms per loop


    //anaconda/lib/python3.5/site-packages/ipykernel/__main__.py:2: VisibleDeprecationWarning: using a non-integer number instead of an integer will result in an error in the future
      from ipykernel import kernelapp as app


#### 75. Consider two arrays A and B of shape (8,3) and (2,2). How to find rows of A that contain elements of each row of B regardless of the order of the elements in B ?

```python

# Author: Gabe Schwartz

A = np.random.randint(0,5,(8,3))
B = np.random.randint(0,5,(2,2))

C = (A[..., np.newaxis, np.newaxis] == B)
rows = (C.sum(axis=(1,2,3)) >= B.shape[1]).nonzero()[0]
print(rows)

```

    [0 1 3 5 6 7]


#### 76. Considering a 10x3 matrix, extract rows with unequal values (e.g. [2,2,3])

```python
# Author: Robert Kern

Z = np.random.randint(0,5,(10,3))
E = np.logical_and.reduce(Z[:,1:] == Z[:,:-1], axis=1)
U = Z[~E]
print(Z)
print(U)
```

    [[4 3 3]
     [0 2 2]
     [3 1 2]
     [4 3 0]
     [0 3 2]
     [4 0 4]
     [0 1 2]
     [4 2 0]
     [3 0 0]
     [2 4 0]]
    [[4 3 3]
     [0 2 2]
     [3 1 2]
     [4 3 0]
     [0 3 2]
     [4 0 4]
     [0 1 2]
     [4 2 0]
     [3 0 0]
     [2 4 0]]


#### 77. Convert a vector of ints into a matrix binary representation

```python
# Author: Warren Weckesser

I = np.array([0, 1, 2, 3, 15, 16, 32, 64, 128])
B = ((I.reshape(-1,1) & (2**np.arange(8))) != 0).astype(int)
print(B[:,::-1])

# Author: Daniel T. McDonald

I = np.array([0, 1, 2, 3, 15, 16, 32, 64, 128], dtype=np.uint8)
print(np.unpackbits(I[:, np.newaxis], axis=1))

```

    [[0 0 0 0 0 0 0 0]
     [0 0 0 0 0 0 0 1]
     [0 0 0 0 0 0 1 0]
     [0 0 0 0 0 0 1 1]
     [0 0 0 0 1 1 1 1]
     [0 0 0 1 0 0 0 0]
     [0 0 1 0 0 0 0 0]
     [0 1 0 0 0 0 0 0]
     [1 0 0 0 0 0 0 0]]
    [[0 0 0 0 0 0 0 0]
     [0 0 0 0 0 0 0 1]
     [0 0 0 0 0 0 1 0]
     [0 0 0 0 0 0 1 1]
     [0 0 0 0 1 1 1 1]
     [0 0 0 1 0 0 0 0]
     [0 0 1 0 0 0 0 0]
     [0 1 0 0 0 0 0 0]
     [1 0 0 0 0 0 0 0]]


#### 78. Given a two dimensional array, how to extract unique rows ? 

```python
# Author: Jaime Fernández del Río

Z = np.random.randint(0,2,(6,3))
T = np.ascontiguousarray(Z).view(np.dtype((np.void, Z.dtype.itemsize * Z.shape[1])))
_, idx = np.unique(T, return_index=True)
uZ = Z[idx]
print(uZ)
```

    [[1 0 0]
     [1 1 0]
     [1 1 1]]


#### 79. Considering 2 vectors A & B, write the einsum equivalent of inner, outer, sum, and mul function 

```python
# Author: Alex Riley
# Make sure to read: https://ajcr.net/Basic-guide-to-einsum/

A= np.arange(3)
B =  np.arange(12).reshape(3,4)
print (A)
#np.einsum('ii->', A)       # np.sum(A)
#np.einsum('i,i->i', A, B) # A * B
#np.einsum('i,i', A, B)    # np.inner(A, B)
#np.einsum('...i,j', A, B)    # np.outer(A, B)
```

    [0 1 2]


#### 80. Considering a path described by two vectors (X,Y), how to sample it using equidistant samples ?

```python
# Author: Bas Swinckels

phi = np.arange(0, 10*np.pi, 0.1)
a = 1
x = a*phi*np.cos(phi)
y = a*phi*np.sin(phi)

dr = (np.diff(x)**2 + np.diff(y)**2)**.5 # segment lengths
r = np.zeros_like(x)
r[1:] = np.cumsum(dr)                # integrate path
r_int = np.linspace(0, r.max(), 200) # regular spaced path
x_int = np.interp(r_int, r, x)       # integrate path
y_int = np.interp(r_int, r, y)
```


```python

```
