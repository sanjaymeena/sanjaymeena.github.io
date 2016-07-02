---
title: 'How to create GATE plugins'
author: Sanjay Meena
layout: single
sitemap: true
published: true
excerpt: How to create GATE plugins
categories: [Tech]
tags: [java, NLP, Gate]
keywords: gate plugin, java
---

<b> Table of Content </b>

* TOC
{:toc}

# Introduction

[General Architecture for Text Engineering (GATE) ](https://gate.ac.uk/) is a Java suite of tools originally developed at the University of Sheffield for  all sorts of natural language processing tasks, including information extraction in many languages. It is open source software capable of solving almost any text processing problem .

[GATE](https://gate.ac.uk/) is a Java suite of tools originally developed at the University of Sheffield for  all sorts of natural language processing tasks, including information extraction in many languages. It is open source software capable of solving almost any text processing problem .

 GATE has been compared to [NLTK](http://www.nltk.org/) and [RapidMiner](http://en.wikipedia.org/wiki/RapidMiner). It is very extensible framework. Its architecture is based on components (or resources). Its framework functions as a backbone into which users can plug components.</span><br style="color: #000000;" /><br style="color: #000000;" /><span style="color: #000000;">Each component (i.e., a Java Beans), is a reusable chunks of software with well-defined interfaces that may be deployed in a variety of contexts. You can define applications with processing pipelines using these reusable components. In GATE, these resources are officially named </span><strong style="color: #000000;">CREOLE</strong><span style="color: #000000;"> (</span><strong style="color: #000000;">C</strong><span style="color: #000000;">ollection of Reusable Objects for Language Engineering</span><span style="color: #000000;">).</span><br style="color: #000000;" /><br style="color: #000000;" />

 This creole plugins along with the Gate Framework can be deployed in an User&#8217;s custom application. This post shows how to create gate plugins.

You can download the source code from <strong style="color: #ff0000;"><a href="https://github.com/sanjaymeena/GatePluginTutorial">github</a></strong>


## CREOLE Resources 

<p style="color: #000000;">
  GATE components are one of three types:
</p>

<ol style="color: #000000;">
  <li>
    <strong>Language Resources</strong> (LRs) represent entities such as lexicons (e.g. Word-Net), corpora or ontologies
  </li>
  <li>
    <strong>Processing Resources</strong> (PRs) represent entities that are primarily algorithmic, such as parsers, generators or n-gram modellers
  </li>
  <li>
    <strong>Visual Resources</strong> (VRs) represent visualisation and editing components that participate in GUI
  </li>
</ol>

<span style="color: #000000;">To better organize CREOLE resources, CREOLE </span><strong style="color: #000000;">plugins</strong><span style="color: #000000;"> are used. In other words, resource implementations can be grouped together as ‘plugins’ and stored at a URL.</span><br style="color: #000000;" /><br style="color: #000000;" />

<h3 style="color: #000000;">
  <span id="CREOLE_Plugins">CREOLE Plugins</span>
</h3>

<span style="color: #000000;">To create a CREOLE plugin, you layout its contents in a directory. Within the directory, it can have a jar which holds its resource implementation, a configuration file (i.e., creole.xml), and external resources such as rules, gazetteer lists, schemas, etc in a </span><em style="color: #000000;">resources</em><span style="color: #000000;"> folder and all the plugin dependent libraries in lib folder. </span> Lets create a GateTutorial Plugin to illustrate the process of plugin creation. This plugin has been created for Gate 7.1 Developer.  This plugin will count the number of occurence of word &#8220;vinci&#8221; at sentence level and document level. <img class="aligncenter wp-image-127 size-large" src="/images/posts/tech/gate/GateCapture-1024x562.jpg" alt="GateCapture- create gate plugins" width="1024" height="562" srcset="/images/posts/tech/gate/GateCapture-1024x562.jpg 1024w, /images/posts/tech/gate/GateCapture.jpg 1145w" sizes="(max-width: 1024px) 100vw, 1024px" />

# <span id="Plugin_creation_steps">Plugin creation steps </span>

The gate plugin can be created from the bootstrap wizard from Gate developer -> Tools If you like you can skip this process  get the GatePlugin tutorial source code from <span style="color: #ff0000;"><strong> <a href="https://github.com/sanjaymeena/GatePluginTutorial"><span style="color: #ff0000;">here</span></a></strong></span> 


[<img class="alignnone wp-image-122 size-medium" src="/images/posts/tech/gate/bootstrap-300x242.jpg" alt="bootstrap - create gate plugins" width="300" height="242" />](/images/posts/tech/gate/bootstrap.jpg) 

There are several modifications which need to be done in the build.xml :

## 1.  Replace the lines as shown below :

[<img class="aligncenter wp-image-131" src="/images/posts/tech/gate/Untitled-1024x458.jpg" alt="create gate plugins" width="1024" height="388" />](/images/posts/tech/gate/Untitled.jpg) 

## 2.  Add the location of Gate 7.1 installation in gate.home property 
  
For example : <property name=&#8221;gate.home&#8221; location=&#8221;D:/Installed\_Programs/Gate\_7.1&#8243; /> 

## 3.  Create New Project in Eclipse

 If you are working in eclipse, you can create a new project from existing Ant Buildfile. 

[<img class="alignleft wp-image-126 size-medium" src="/images/posts/tech/gate/e1-300x287.jpg" alt="create gate plugins" width="300" height="287" srcset="/images/posts/tech/gate/e1-300x287.jpg 300w, /images/posts/tech/gate/e1.jpg 517w" sizes="(max-width: 300px) 100vw, 300px" />](/images/posts/tech/gate/e1.jpg)[<img class="alignnone wp-image-125 size-medium" src="/images/posts/tech/gate/e2-300x280.jpg" alt="create gate plugins" width="300" height="280" srcset="/images/posts/tech/gate/e2-300x280.jpg 300w, /images/posts/tech/gate/e2.jpg 521w" sizes="(max-width: 300px) 100vw, 300px" />](/images/posts/tech/gate/e2.jpg) 

If you like all the files in your Eclipse workspace, you can delete the content of the project and then copy all the project files from the original location.  

Eclipse may consider &#8220;src&#8221; as a normal folder. In that case, you can create a new source folder and name it as &#8220;src&#8221;.

## 4. <span id="Using_CREOLE_Resources">Using CREOLE Resources</span>

<span style="color: #000000;">In the applications using </span><em style="color: #000000;"><a style="color: #436590;" href="http://gate.ac.uk/family/embedded.html">GATE Embedded</a></em><span style="color: #000000;">, you can contruct an information extraction (or IE) pipeline using CREOLE resources from different CREOLE plugins. For example, in the  <span style="text-decoration: underline;">GatePluginTutorial example </span></span><span style="color: #000000;">, it constructs a pipeline (i.e.,</span><em style="color: #000000;">SerialAnalyserController</em><span style="color: #000000;">) using three different PRs:</span>


``` java
String[] processingResources = {
				"gate.creole.tokeniser.DefaultTokeniser",
				"gate.creole.splitter.SentenceSplitter",
				"com.gate.plugin.vinci.Vinci" };
``` 


Two of them are provided by ANNIE plugin and the third one (i.e., com.gate.plugin.vinci.Vinci) is provided by GateTutorial </span><span style="color: #000000;">plugin.</span>

``` java

// need resource data for Vinci
		Gate.getCreoleRegister().registerDirectories(
				new File(System.getProperty("user.dir")).toURL());
		// need ANNIE plugin for the Defaulttokeniser and SentenceSplitter
		Gate.getCreoleRegister().registerDirectories(
				new File(Gate.getPluginsHome(), ANNIEConstants.PLUGIN_DIR)
						.toURL());
``` 

<p style="color: #000000;">
  In the above statements, we use <em>registerDirectories()</em> API to load plugins from a given CREOLE directory URL. Note that CREOLE directory URLs should point to the parent location of the <em>creole.xml</em> file.
</p>

<p style="color: #000000;">
  When a plugin is loaded into GATE it looks for a configuration file called <em>creole.xml</em> relative to the plugin URL and uses the contents of this file to determine what resources this plugin declares and where to find the classes that implement the resource types (typically these classes are stored in a JAR file in the plugin directory).
</p>

<p style="color: #000000;">
  The class &#8220;com<em>.gate.plugin.vinci.Vinci</em>&#8221; in GateTutorialPlugin<em>.jar</em> provides the implementation of the new PR. Because this PR doesn&#8217;t need any gazetteer list or rules, it has an empty resources folder. In its <em>creole.xml</em>, the content is as simple as:
</p>

``` xml
<CREOLE-DIRECTORY>
<JAR SCAN="true">GatePluginTutorial.jar</JAR>
</CREOLE-DIRECTORY>

```

<span style="color: #000000;">This tells GATE to load GatePluginTutorial</span><em style="color: #000000;">.jar</em><span style="color: #000000;"> and scan its contents looking for resource classes annotated with</span><em style="color: #000000;">@CreoleResource</em><span style="color: #000000;">.</span> You can download the source code from <strong style="color: #ff0000;"><a href="https://github.com/sanjaymeena/GatePluginTutorial">github</a></strong>

